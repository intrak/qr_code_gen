import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRPreview = ({
    qrRef,
    url,
    fgColor,
    bgColor,
    isTransparent,
    showTag,
    tagPosition,
    tagText,
    tagFontSize,
    tagRotation,
    showCaption,
    captionText,
    captionFontSize,
    captionColor,
    activeLogo,
    logoSize,
    logoExcavate,
    t
}) => {
    return (
        <div className="preview-section">
            <div
                className={`qr-frame-wrapper ${['left', 'right'].includes(tagPosition) ? 'side-labels' : ''}`}
                ref={qrRef}
                style={{ background: isTransparent ? 'transparent' : bgColor }}
            >
                {showTag && tagPosition === 'left' && (
                    <div
                        className={`scan-me-tag side ${tagRotation === 180 ? 'rotate-180' : ''}`}
                        style={{ background: fgColor, fontSize: `${tagFontSize}rem` }}
                    >
                        {tagText}
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {showTag && tagPosition === 'top' && (
                        <div
                            className="scan-me-tag"
                            style={{ background: fgColor, fontSize: `${tagFontSize}rem` }}
                        >
                            {tagText}
                        </div>
                    )}

                    <QRCodeSVG
                        value={url}
                        size={256}
                        fgColor={fgColor}
                        bgColor={isTransparent ? 'transparent' : bgColor}
                        level="H"
                        includeMargin={false}
                        imageSettings={activeLogo ? {
                            src: activeLogo,
                            height: logoSize,
                            width: logoSize,
                            excavate: logoExcavate,
                        } : undefined}
                    />

                    {showTag && tagPosition === 'bottom' && (
                        <div
                            className="scan-me-tag bottom"
                            style={{ background: fgColor, fontSize: `${tagFontSize}rem` }}
                        >
                            {tagText}
                        </div>
                    )}

                    {showCaption && (
                        <div
                            className="url-caption"
                            style={{ fontSize: `${captionFontSize}rem`, color: captionColor }}
                        >
                            {captionText}
                        </div>
                    )}
                </div>

                {showTag && tagPosition === 'right' && (
                    <div
                        className={`scan-me-tag side ${tagRotation === 180 ? 'rotate-180' : ''}`}
                        style={{ background: fgColor, fontSize: `${tagFontSize}rem` }}
                    >
                        {tagText}
                    </div>
                )}
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {t.livePreview} {isTransparent ? `(${t.transparent})` : ''}
            </p>
        </div>
    );
};

export default QRPreview;
