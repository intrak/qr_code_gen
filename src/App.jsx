import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Share2, Type, Palette, Maximize } from 'lucide-react';
import html2canvas from 'html2canvas';

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
    const [tagPosition, setTagPosition] = useState('top'); // 'top' or 'bottom'
    const [showCaption, setShowCaption] = useState(true);
    const [captionText, setCaptionText] = useState('mikit.org');
    const [tagFontSize, setTagFontSize] = useState(1.25); // rem
    const [captionFontSize, setCaptionFontSize] = useState(0.875); // rem
    const [captionColor, setCaptionColor] = useState('#475569');
    const [isTransparent, setIsTransparent] = useState(false);

    const qrRef = useRef(null);

    const downloadQR = async () => {
        if (!qrRef.current) return;

        try {
            const canvas = await html2canvas(qrRef.current, {
                backgroundColor: null,
                scale: 4, // High quality
                logging: false,
                useCORS: true,
                onclone: (clonedDoc) => {
                    if (isTransparent) {
                        const wrapper = clonedDoc.querySelector('.qr-frame-wrapper');
                        if (wrapper) {
                            wrapper.style.background = 'transparent';
                            wrapper.style.boxShadow = 'none';
                        }
                    }
                }
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = `qr-code-${captionText || 'generated'}${isTransparent ? '-transparent' : ''}.png`;
            link.click();
        } catch (err) {
            console.error('Download failed', err);
            alert('Wystąpił błąd podczas pobierania kodu QR.');
        }
    };

    return (
        <div className="app-container">
            <div className="controls-section glass-card">
                <div>
                    <h1>Generator QR</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Stwórz stylowy kod QR z własnym opisem.
                    </p>
                </div>

                <div className="input-group">
                    <label>Link / Adres URL</label>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                    />
                </div>

                <div className="settings-grid">
                    <div className="input-group">
                        <label>Kolor kodu</label>
                        <div className="color-picker">
                            <input
                                type="color"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value)}
                            />
                            <span style={{ fontSize: '0.8rem' }}>{fgColor}</span>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Tekst etykiety</label>
                        <input
                            type="text"
                            value={tagText}
                            onChange={(e) => setTagText(e.target.value)}
                            placeholder="SCAN ME"
                        />
                    </div>
                </div>

                <div className="settings-grid">
                    <div className="input-group">
                        <label>Pozycja etykiety</label>
                        <select
                            value={tagPosition}
                            onChange={(e) => setTagPosition(e.target.value)}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                border: '1px solid var(--border-color)',
                                padding: '0.5rem',
                                borderRadius: '8px'
                            }}
                        >
                            <option value="top">Góra</option>
                            <option value="bottom">Dół</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Wielkość etykiety: {tagFontSize}rem</label>
                        <input
                            type="range"
                            min="0.5"
                            max="6"
                            step="0.1"
                            value={tagFontSize}
                            onChange={(e) => setTagFontSize(parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                <div className="settings-grid">
                    <div className="input-group">
                        <label className="toggle-group">
                            <input
                                type="checkbox"
                                checked={showTag}
                                onChange={(e) => setShowTag(e.target.checked)}
                            />
                            Pokaż etykietę
                        </label>
                    </div>
                </div>

                <div className="input-group">
                    <label>Czytelny link pod kodem</label>
                    <input
                        type="text"
                        value={captionText}
                        onChange={(e) => setCaptionText(e.target.value)}
                        placeholder="mikit.org"
                    />
                    <div className="settings-grid" style={{ marginTop: '0.5rem' }}>
                        <div className="input-group">
                            <label className="toggle-group">
                                <input
                                    type="checkbox"
                                    checked={showCaption}
                                    onChange={(e) => setShowCaption(e.target.checked)}
                                />
                                Pokaż link
                            </label>
                        </div>
                        <div className="input-group">
                            <label>Wielkość linku: {captionFontSize}rem</label>
                            <input
                                type="range"
                                min="0.5"
                                max="6"
                                step="0.05"
                                value={captionFontSize}
                                onChange={(e) => setCaptionFontSize(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="input-group" style={{ marginTop: '0.5rem' }}>
                        <label>Kolor linku</label>
                        <div className="color-picker">
                            <input
                                type="color"
                                value={captionColor}
                                onChange={(e) => setCaptionColor(e.target.value)}
                            />
                            <span style={{ fontSize: '0.8rem' }}>{captionColor}</span>
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <label className="toggle-group">
                        <input
                            type="checkbox"
                            checked={isTransparent}
                            onChange={(e) => setIsTransparent(e.target.checked)}
                        />
                        Eksport z przezroczystym tłem
                    </label>
                </div>

                <div className="download-buttons" style={{ marginTop: '1rem' }}>
                    <button onClick={downloadQR}>
                        <Download size={20} /> Pobierz PNG
                    </button>
                    <button className="secondary">
                        <Share2 size={20} /> Udostępnij
                    </button>
                </div>
            </div>

            <div className="preview-section">
                <div
                    className="qr-frame-wrapper"
                    ref={qrRef}
                    style={{ background: isTransparent ? 'transparent' : bgColor }}
                >
                    {showTag && tagPosition === 'top' && (
                        <div
                            className="scan-me-tag"
                            style={{ background: fgColor, fontSize: `${tagFontSize}rem` }}
                        >
                            {tagText}
                        </div>
                    )}

                    <QRCodeCanvas
                        value={url}
                        size={256}
                        fgColor={fgColor}
                        bgColor={isTransparent ? 'transparent' : bgColor}
                        level="H"
                        includeMargin={false}
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

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Podgląd na żywo {isTransparent ? '(przezroczysty)' : ''}
                </p>
            </div>
        </div>
    );
}

export default App;
