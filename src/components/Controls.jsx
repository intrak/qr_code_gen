import React from 'react';
import { Download, Share2, X } from 'lucide-react';
import { SOCIAL_ICONS } from '../constants/socialIcons';

const Controls = ({
    t,
    language,
    setLanguage,
    url,
    setUrl,
    fgColor,
    setFgColor,
    tagText,
    setTagText,
    tagPosition,
    setTagPosition,
    tagFontSize,
    setTagFontSize,
    tagRotation,
    setTagRotation,
    showTag,
    setShowTag,
    captionText,
    setCaptionText,
    captionFontSize,
    setCaptionFontSize,
    captionColor,
    setCaptionColor,
    showCaption,
    setShowCaption,
    isTransparent,
    setIsTransparent,
    downloadQR,
    setIsShareModalOpen,
    logoImage,
    setLogoImage,
    handleLogoUpload,
    logoSize,
    setLogoSize,
    logoExcavate,
    setLogoExcavate,
    centerText,
    setCenterText,
    useBrandColor,
    setUseBrandColor,
    selectedPreset,
    setSelectedPreset,
    setCenterTextAndClear, // Helper function to clear preset/logo
    getIconDataUrl // Helper to get preset icon data
}) => {
    return (
        <div className="controls-section glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1>{t.title}</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        {t.subtitle}
                    </p>
                </div>
                <div className="language-switcher">
                    <button
                        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                        onClick={() => setLanguage('en')}
                    >
                        EN
                    </button>
                    <button
                        className={`lang-btn ${language === 'pl' ? 'active' : ''}`}
                        onClick={() => setLanguage('pl')}
                    >
                        PL
                    </button>
                </div>
            </div>

            <div className="input-group">
                <label>{t.urlLabel}</label>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                />
            </div>

            <div className="settings-grid">
                <div className="input-group">
                    <label>{t.fgColorLabel}</label>
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
                    <label>{t.tagTextLabel}</label>
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
                    <label>{t.tagPositionLabel}</label>
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
                        <option value="top">{t.top}</option>
                        <option value="bottom">{t.bottom}</option>
                        <option value="left">{t.left}</option>
                        <option value="right">{t.right}</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>{['left', 'right'].includes(tagPosition) ? t.tagRotationLabel : t.tagSizeLabel + ': ' + tagFontSize + 'rem'}</label>
                    {['left', 'right'].includes(tagPosition) ? (
                        <button
                            className="secondary"
                            style={{ width: '100%', justifyContent: 'center' }}
                            onClick={() => setTagRotation(tagRotation === 0 ? 180 : 0)}
                        >
                            {tagRotation === 0 ? '0°' : '180°'}
                        </button>
                    ) : (
                        <input
                            type="range"
                            min="0.5"
                            max="6"
                            step="0.1"
                            value={tagFontSize}
                            onChange={(e) => setTagFontSize(parseFloat(e.target.value))}
                        />
                    )}
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
                        {t.showTagLabel}
                    </label>
                </div>
            </div>

            <div className="input-group">
                <label>{t.captionLabel}</label>
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
                            {t.showCaptionLabel}
                        </label>
                    </div>
                    <div className="input-group">
                        <label>{t.captionSizeLabel}: {captionFontSize}rem</label>
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
                    <label>{t.captionColorLabel}</label>
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
                    {t.transparentLabel}
                </label>
            </div>

            <div className="download-buttons" style={{ marginTop: '1rem' }}>
                <button onClick={downloadQR}>
                    <Download size={20} /> {t.downloadBtn}
                </button>
                <button className="secondary" onClick={() => setIsShareModalOpen(true)}>
                    <Share2 size={20} /> {t.shareBtn}
                </button>
            </div>

            <div className="section-divider" />

            <div className="input-group">
                <label>{t.logoLabel}</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <button
                        className="secondary"
                        style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                opacity: 0,
                                cursor: 'pointer',
                                width: '100%',
                                height: '100%'
                            }}
                        />
                        {t.uploadLogo}
                    </button>
                </div>

                <div className="icon-presets">
                    {Object.keys(SOCIAL_ICONS).map(type => (
                        <button
                            key={type}
                            className={`icon-preset-btn ${selectedPreset === type ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedPreset(type);
                                setCenterText('');
                            }}
                            title={type}
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d={SOCIAL_ICONS[type]} />
                            </svg>
                        </button>
                    ))}
                </div>

                {logoImage && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                        <label className="toggle-group" style={{ fontSize: '0.75rem' }}>
                            <input
                                type="checkbox"
                                checked={useBrandColor}
                                onChange={(e) => setUseBrandColor(e.target.checked)}
                            />
                            {t.brandColorLabel}
                        </label>
                        <button className="secondary" onClick={() => { setLogoImage(null); setCenterText(''); setSelectedPreset(null); }} style={{ color: '#ef4444', padding: '4px' }}>
                            {t.removeLogo}
                        </button>
                    </div>
                )}
            </div>

            <div className="input-group">
                <label>{t.centerTextLabel}</label>
                <input
                    type="text"
                    maxLength={4}
                    value={centerText}
                    onChange={(e) => {
                        setCenterText(e.target.value.toUpperCase());
                        setLogoImage(null);
                        setSelectedPreset(null);
                    }}
                    placeholder="MKIT"
                />
            </div>

            {logoImage && (
                <div className="settings-grid">
                    <div className="input-group">
                        <label>{t.logoSizeLabel}: {logoSize}px</label>
                        <input
                            type="range"
                            min="20"
                            max="100"
                            step="1"
                            value={logoSize}
                            onChange={(e) => setLogoSize(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="input-group">
                        <label className="toggle-group">
                            <input
                                type="checkbox"
                                checked={logoExcavate}
                                onChange={(e) => setLogoExcavate(e.target.checked)}
                            />
                            {t.excavateLabel}
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Controls;
