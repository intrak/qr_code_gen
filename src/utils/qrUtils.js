/**
 * Generates a full SVG string including custom frames, tags, and captions.
 * Replicates the visual layout of the React components into a standalone SVG.
 */
export const generateSVGString = (qrRef, config) => {
    const {
        fgColor,
        bgColor = '#ffffff',
        isTransparent,
        showTag,
        tagPosition,
        tagText,
        tagFontSize, // in rem
        tagRotation,
        showCaption,
        captionText,
        captionFontSize, // in rem
        captionColor,
        logoSize,
        qrSize = 256
    } = config;

    // Constants based on CSS
    const BASE_FONT_SIZE = 16;
    const PADDING = 24; // p-6
    const TAG_PADDING_X = 24; // px-6
    const TAG_PADDING_Y = 8; // py-2
    const TAG_BORDER_RADIUS = 12; // rounded-xl ~ 12px
    const FONT_FAMILY = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

    // Get the inner QR SVG content
    const qrSvgElement = qrRef.current ? qrRef.current.querySelector('svg') : null;
    let qrPaths = '';
    let qrViewBox = `0 0 ${qrSize} ${qrSize}`;

    if (qrSvgElement) {
        qrPaths = qrSvgElement.innerHTML;
        const vb = qrSvgElement.getAttribute('viewBox');
        if (vb) qrViewBox = vb;
    }

    // Measure Text (Approximate)
    const measureText = (text, sizeRem) => {
        const fontSize = sizeRem * BASE_FONT_SIZE;
        // Approximation: avg char width ~0.6em
        return text.length * fontSize * 0.6;
    };

    const tagFontSizePx = tagFontSize * BASE_FONT_SIZE;
    const captionFontSizePx = captionFontSize * BASE_FONT_SIZE;

    // Layout Calculations
    let width = qrSize + (PADDING * 2);
    let height = qrSize + (PADDING * 2);
    let qrX = PADDING;
    let qrY = PADDING;

    // Tag Dimensions
    const tagTextWidth = measureText(tagText, tagFontSize);
    const tagHeight = tagFontSizePx + (TAG_PADDING_Y * 2); // Height of the tag container
    // Tag Width isn't fixed in CSS, it wraps content.
    // But for SVG we need a rect width. 
    // Let's assume a minimum width or just fit text + padding.
    const tagWidth = tagTextWidth + (TAG_PADDING_X * 2);

    // Adjust dimensions based on Tag Position
    let tagEl = '';

    if (showTag) {
        if (tagPosition === 'top') {
            height += tagHeight + 16; // mb-4 is 16px
            qrY += tagHeight + 16;
        } else if (tagPosition === 'bottom') {
            height += tagHeight + 16; // mt-4 is 16px
            // qrY stays same
        } else if (tagPosition === 'left') {
            width += tagHeight + 16; // gap-4 is 16px. tagHeight is used because it's vertical
            qrX += tagHeight + 16;
        } else if (tagPosition === 'right') {
            width += tagHeight + 16;
        }
    }

    // Adjust dimensions based on Caption
    let captionEl = '';
    if (showCaption && captionText) {
        height += captionFontSizePx * 1.5 + 12; // Line height + mt-3 (12px)
    }

    // Build SVG parts
    const bgFill = isTransparent ? 'none' : bgColor;

    // Background
    const bgRect = `<rect x="0" y="0" width="${width}" height="${height}" fill="${bgFill}" rx="24" ry="24"/>`; // rounded-3xl ~ 24px

    // Render Tag
    if (showTag) {
        let tx = 0, ty = 0, tWidth = 0, tHeight = 0, rotate = 0;
        let tTextX = 0, tTextY = 0;

        if (tagPosition === 'top') {
            tWidth = tagWidth; // Approximate
            tHeight = tagHeight;
            tx = (width - tWidth) / 2;
            ty = PADDING;
        } else if (tagPosition === 'bottom') {
            tWidth = tagWidth;
            tHeight = tagHeight;
            tx = (width - tWidth) / 2;
            ty = qrY + qrSize + 16; // mt-4
        } else if (tagPosition === 'left') {
            // Vertical Mode
            // In CSS: writing-mode: vertical-rl.
            // SVG: rotate text.
            tWidth = tagHeight; // Swapped
            tHeight = tagWidth; // Swapped (approx)

            // Positioning logic for vertical tag is tricky without exact font metrics.
            // We'll mimic visually: a rect that is tall and thin.
            // Actually, let's keep it simple: rotate the group.

            // We want the visual center of the tag to be aligned with QR center Y?
            // CSS: flex-row, items-center. So centered vertically.

            const centerY = qrY + (qrSize / 2);
            const centerX = PADDING + (tagHeight / 2); // tagHeight is the width of the vertical bar

            // Not perfectly accurate due to flex gap, basically:
            tx = PADDING;
            ty = (height - tagWidth) / 2; // rough vertical center

            // To implement vertical tag properly in SVG:
            // Translate to center, rotate -90 (or 90), draw rect centered?
            // Easier: Draw standard horizontal tag, then rotate the whole group.

            // Reset Layout for rotation approach:
            // Draw horizontal tag at 0,0
            // Rotation is either -90 or 90
            rotate = tagRotation === 180 ? 90 : -90;

            // Adjust coordinates based on rotation... actually complex.
            // Alternative: Just draw a rect and text with transform.
        } else if (tagPosition === 'right') {
            rotate = tagRotation === 180 ? 90 : -90;
        }

        // Simplified rendering for Top/Bottom (Horizontal)
        if (tagPosition === 'top' || tagPosition === 'bottom') {
            // Rect
            // Centering text is easier with text-anchor="middle"
            const centerX = width / 2;
            // Rect needs exact X
            const rectX = centerX - (tagWidth / 2); // using approximated width
            // ... actually, simpler to just use text-anchor middle and a rect that attempts to wrap it.
            // Since we don't know exact text width, we might guess or just assume the user sees what they see.
            // But wait, user wants WYSWYG.
            // Better strategy: Use foreignObject ONLY for the tag? No, standard SVG is requested.

            // Let's use a wide-enough rect or dynamic calculation based on char count.
            const calculatedTagWidth = (tagText.length * tagFontSizePx * 0.7) + (TAG_PADDING_X * 2);
            const rectX_dyn = centerX - (calculatedTagWidth / 2);

            tagEl = `
                <g>
                    <rect x="${rectX_dyn}" y="${ty}" width="${calculatedTagWidth}" height="${tagHeight}" rx="${TAG_BORDER_RADIUS}" ry="${TAG_BORDER_RADIUS}" fill="${fgColor}" />
                    <text x="${centerX}" y="${ty + (tagHeight / 2)}" fill="#FFFFFF" 
                        font-family="${FONT_FAMILY}" font-weight="bold" font-size="${tagFontSizePx}" 
                        text-anchor="middle" dominant-baseline="middle" letter-spacing="0.05em">
                        ${tagText.toUpperCase()}
                    </text>
                </g>
            `;
        } else {
            // Vertical Tags (Left/Right)
            // We need to rotate around the center of the tag.
            const isLeft = tagPosition === 'left';
            const calculatedTagLen = (tagText.length * tagFontSizePx * 0.7) + (TAG_PADDING_X * 2); // Length of the bar
            const barThickness = tagHeight; // Width of the bar

            // Center Y of the QR area
            // qrY is already calculated.
            // But wait, layout for Left/Right:
            // [Tag] [Gap] [QR]
            // Height is essentially QR size + padding (unless tag is huge, which we assume fits).
            const totalHeight = qrSize + (PADDING * 2);
            const centerY = totalHeight / 2;

            // X position
            const barCenterX = isLeft ? PADDING + (barThickness / 2) : width - PADDING - (barThickness / 2);

            // Rotation logic matches CSS: 'rotate-180' on top of vertical-rl.
            // Default vertical-rl reads top-to-bottom? No, standard is rotated 90deg clockwise.
            // Let's just rotate -90 deg for standard vertical.

            const rotAngle = tagRotation === 180 ? 180 : 0; // The extra rotation
            // Base vertical rotation is -90 for "up reading"? 
            // CSS writing-mode: vertical-rl usually orients characters upright if CJK, or rotated 90deg for Latin.
            // In the app screenshot/code: whitespace-nowrap [writing-mode:vertical-rl].

            // Let's just Rotate standard layout by -90 or 90.
            const finalRotation = isLeft ? (tagRotation === 180 ? 90 : -90) : (tagRotation === 180 ? -90 : 90);

            tagEl = `
                <g transform="translate(${barCenterX}, ${centerY}) rotate(${finalRotation})">
                    <rect x="${-calculatedTagLen / 2}" y="${-barThickness / 2}" width="${calculatedTagLen}" height="${barThickness}" rx="${TAG_BORDER_RADIUS}" ry="${TAG_BORDER_RADIUS}" fill="${fgColor}" />
                    <text x="0" y="0" fill="#FFFFFF" 
                        font-family="${FONT_FAMILY}" font-weight="bold" font-size="${tagFontSizePx}" 
                        text-anchor="middle" dominant-baseline="middle" letter-spacing="0.05em">
                        ${tagText.toUpperCase()}
                    </text>
                </g>
             `;
        }
    }

    // Render Caption
    if (showCaption && captionText) {
        const cx = width / 2;
        // Position: below QR code (and bottom tag if present)
        // Calculating Y of caption
        let cy = qrY + qrSize + 12 + (captionFontSizePx / 2); // mt-3 + half font size
        if (showTag && tagPosition === 'bottom') {
            cy += tagHeight + 16;
        }

        captionEl = `
            <text x="${cx}" y="${cy}" fill="${captionColor}" 
                font-family="${FONT_FAMILY}" font-weight="500" font-size="${captionFontSizePx}" 
                text-anchor="middle" dominant-baseline="middle">
                ${captionText}
            </text>
        `;
    }

    const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${bgRect}
    ${tagEl}
    <g transform="translate(${qrX}, ${qrY})">
        <svg width="${qrSize}" height="${qrSize}" viewBox="${qrViewBox}">
            ${qrPaths}
        </svg>
    </g>
    ${captionEl}
</svg>
    `.trim();

    return svgString;
};
