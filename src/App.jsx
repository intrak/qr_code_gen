import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { SOCIAL_ICONS } from './constants/socialIcons';
import { translations } from './constants/translations';
import Controls from './components/Controls';
import QRPreview from './components/QRPreview';
import ShareModal from './components/ShareModal';

/**
 * Modern QR Code Generator
 * Features custom framing, scan-me labels, and readable URL captions.
 */
function App() {
    const [url, setUrl] = useState('https://mikit.org');
    const [fgColor, setFgColor] = useState('#1e293b');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [tagText, setTagText] = useState('SCAN ME');
    const [showTag, setShowTag] = useState(true);
    const [tagPosition, setTagPosition] = useState('top'); // 'top', 'bottom', 'left', 'right'
    const [showCaption, setShowCaption] = useState(true);
    const [captionText, setCaptionText] = useState('mikit.org');
    const [tagFontSize, setTagFontSize] = useState(1.25); // rem
    const [tagRotation, setTagRotation] = useState(0); // 0 or 180
    const [captionFontSize, setCaptionFontSize] = useState(0.875); // rem
    const [captionColor, setCaptionColor] = useState('#475569');
    const [isTransparent, setIsTransparent] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [language, setLanguage] = useState('en'); // 'en' or 'pl'
    const [logoImage, setLogoImage] = useState(null);
    const [logoSize, setLogoSize] = useState(50);
    const [logoExcavate, setLogoExcavate] = useState(true);
    const [centerText, setCenterText] = useState('');
    const [useBrandColor, setUseBrandColor] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState(null);

    const t = translations[language];
    const qrRef = useRef(null);

    const generateQRImage = async () => {
        if (!qrRef.current) return null;

        try {
            const canvas = await html2canvas(qrRef.current, {
                backgroundColor: null,
                scale: 4, // High quality
                logging: false,
                useCORS: true,
                onclone: (clonedDoc) => {
                    const wrapper = clonedDoc.querySelector('.qr-frame-wrapper');
                    if (wrapper) {
                        if (isTransparent) {
                            wrapper.style.background = 'transparent';
                            wrapper.style.boxShadow = 'none';
                        }
                        // Ensure layout is preserved in canvas
                        wrapper.style.display = 'flex';
                        if (['left', 'right'].includes(tagPosition)) {
                            wrapper.style.flexDirection = 'row';
                        } else {
                            wrapper.style.flexDirection = 'column';
                        }
                    }
                }
            });
            return canvas.toDataURL("image/png");
        } catch (err) {
            console.error('QR Generation failed', err);
            return null;
        }
    };

    const copyToClipboard = () => {
        if (!navigator.clipboard) {
            alert("Clipboard not supported");
            return;
        }
        navigator.clipboard.writeText(url);
        alert(t.copied);
    };

    const downloadQR = async () => {
        const image = await generateQRImage();
        if (!image) {
            alert(t.downloadError);
            return;
        }

        const link = document.createElement('a');
        link.href = image;
        link.download = `qr-code-${captionText || 'generated'}${isTransparent ? '-transparent' : ''}.png`;
        link.click();
    };

    const shareViaApi = async () => {
        const image = await generateQRImage();
        if (!image || !navigator.share) return;

        try {
            const blob = await (await fetch(image)).blob();
            const file = new File([blob], 'qr-code.png', { type: 'image/png' });
            await navigator.share({
                title: t.shareTitle,
                files: [file]
            });
        } catch (err) {
            console.error('Sharing failed', err);
        }
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoImage(reader.result);
                setCenterText(''); // Clear text logo if image uploaded
                setSelectedPreset(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const generateTextLogo = (text) => {
        if (!text) return null;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;

        // Background
        ctx.fillStyle = isTransparent ? 'transparent' : bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text
        ctx.fillStyle = fgColor;
        ctx.font = 'bold 80px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 100, 100);

        return canvas.toDataURL();
    };

    const getBrandColor = (type) => {
        const colors = {
            facebook: '#1877F2',
            instagram: '#E4405F',
            x: '#000000',
            linkedin: '#0A66C2',
            youtube: '#FF0000',
            whatsapp: '#25D366',
            tiktok: '#000000',
            telegram: '#26A5E4',
            snapchat: '#FFFC00',
            baidu: '#2529D8',
            reddit: '#FF4500',
            pinterest: '#BD081C',
            github: '#181717'
        };
        return colors[type] || fgColor;
    };

    const getIconDataUrl = (type) => {
        const path = SOCIAL_ICONS[type];
        if (!path) return null;
        const color = useBrandColor ? getBrandColor(type) : fgColor;
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="${path}"/></svg>`;
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    };

    const activeLogo = logoImage || (centerText ? generateTextLogo(centerText) : null);

    React.useEffect(() => {
        if (selectedPreset) {
            setLogoImage(getIconDataUrl(selectedPreset));
        }
    }, [fgColor, useBrandColor, selectedPreset]);


    return (
        <div className="app-container">
            <Controls
                t={t}
                language={language}
                setLanguage={setLanguage}
                url={url}
                setUrl={setUrl}
                fgColor={fgColor}
                setFgColor={setFgColor}
                tagText={tagText}
                setTagText={setTagText}
                tagPosition={tagPosition}
                setTagPosition={setTagPosition}
                tagFontSize={tagFontSize}
                setTagFontSize={setTagFontSize}
                tagRotation={tagRotation}
                setTagRotation={setTagRotation}
                showTag={showTag}
                setShowTag={setShowTag}
                captionText={captionText}
                setCaptionText={setCaptionText}
                captionFontSize={captionFontSize}
                setCaptionFontSize={setCaptionFontSize}
                captionColor={captionColor}
                setCaptionColor={setCaptionColor}
                showCaption={showCaption}
                setShowCaption={setShowCaption}
                isTransparent={isTransparent}
                setIsTransparent={setIsTransparent}
                downloadQR={downloadQR}
                setIsShareModalOpen={setIsShareModalOpen}
                logoImage={logoImage}
                setLogoImage={setLogoImage}
                handleLogoUpload={handleLogoUpload}
                logoSize={logoSize}
                setLogoSize={setLogoSize}
                logoExcavate={logoExcavate}
                setLogoExcavate={setLogoExcavate}
                centerText={centerText}
                setCenterText={setCenterText}
                useBrandColor={useBrandColor}
                setUseBrandColor={setUseBrandColor}
                selectedPreset={selectedPreset}
                setSelectedPreset={setSelectedPreset}
                getIconDataUrl={getIconDataUrl}
            />

            <QRPreview
                qrRef={qrRef}
                url={url}
                fgColor={fgColor}
                bgColor={bgColor}
                isTransparent={isTransparent}
                showTag={showTag}
                tagPosition={tagPosition}
                tagText={tagText}
                tagFontSize={tagFontSize}
                tagRotation={tagRotation}
                showCaption={showCaption}
                captionText={captionText}
                captionFontSize={captionFontSize}
                captionColor={captionColor}
                activeLogo={activeLogo}
                logoSize={logoSize}
                logoExcavate={logoExcavate}
                t={t}
            />

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                t={t}
                copyToClipboard={copyToClipboard}
                downloadQR={downloadQR}
                shareViaApi={shareViaApi}
            />
        </div>
    );
}

export default App;
