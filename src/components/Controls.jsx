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
    downloadSVG,
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
    setCenterTextAndClear,
    getIconDataUrl
}) => {
    // Shared input class
    const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base transition focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20";
    const labelClass = "text-sm font-medium text-text-secondary";
    const buttonClass = "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition hover:opacity-90 hover:scale-[1.02] active:scale-95";

    return (
        <div className="flex flex-col gap-6 glass-card">
            <div className="flex justify-between items-start">
                <div>
                    <h1>{t.title}</h1>
                    <p className="text-text-secondary mb-4">
                        {t.subtitle}
                    </p>
                </div>
                <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                    <button
                        className={`px-2 py-1 text-xs rounded transition font-semibold ${language === 'en' ? 'bg-brand-accent text-brand-dark' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
                        onClick={() => setLanguage('en')}
                    >
                        EN
                    </button>
                    <button
                        className={`px-2 py-1 text-xs rounded transition font-semibold ${language === 'pl' ? 'bg-brand-accent text-brand-dark' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
                        onClick={() => setLanguage('pl')}
                    >
                        PL
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className={labelClass}>{t.urlLabel}</label>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className={inputClass}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className={labelClass}>{t.fgColorLabel}</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none p-0"
                        />
                        <span className="text-sm font-mono">{fgColor}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className={labelClass}>{t.tagTextLabel}</label>
                    <input
                        type="text"
                        value={tagText}
                        onChange={(e) => setTagText(e.target.value)}
                        placeholder="SCAN ME"
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className={labelClass}>{t.tagPositionLabel}</label>
                    <select
                        value={tagPosition}
                        onChange={(e) => setTagPosition(e.target.value)}
                        className={inputClass}
                    >
                        <option value="top">{t.top}</option>
                        <option value="bottom">{t.bottom}</option>
                        <option value="left">{t.left}</option>
                        <option value="right">{t.right}</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className={labelClass}>{['left', 'right'].includes(tagPosition) ? t.tagRotationLabel : t.tagSizeLabel + ': ' + tagFontSize + 'rem'}</label>
                    {['left', 'right'].includes(tagPosition) ? (
                        <button
                            className={`${buttonClass} bg-white/10 text-white w-full justify-center`}
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

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className={`flex items-center gap-3 cursor-pointer ${labelClass}`}>
                        <input
                            type="checkbox"
                            checked={showTag}
                            onChange={(e) => setShowTag(e.target.checked)}
                            className="w-5 h-5 rounded accent-brand-accent"
                        />
                        {t.showTagLabel}
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className={labelClass}>{t.captionLabel}</label>
                <input
                    type="text"
                    value={captionText}
                    onChange={(e) => setCaptionText(e.target.value)}
                    placeholder="mikit.org"
                    className={inputClass}
                />
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col gap-2">
                        <label className={`flex items-center gap-3 cursor-pointer ${labelClass}`}>
                            <input
                                type="checkbox"
                                checked={showCaption}
                                onChange={(e) => setShowCaption(e.target.checked)}
                                className="w-5 h-5 rounded accent-brand-accent"
                            />
                            {t.showCaptionLabel}
                        </label>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>{t.captionSizeLabel}: {captionFontSize}rem</label>
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
                <div className="flex flex-col gap-2 mt-2">
                    <label className={labelClass}>{t.captionColorLabel}</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            value={captionColor}
                            onChange={(e) => setCaptionColor(e.target.value)}
                            className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none p-0"
                        />
                        <span className="text-sm font-mono">{captionColor}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className={`flex items-center gap-3 cursor-pointer ${labelClass}`}>
                    <input
                        type="checkbox"
                        checked={isTransparent}
                        onChange={(e) => setIsTransparent(e.target.checked)}
                        className="w-5 h-5 rounded accent-brand-accent"
                    />
                    {t.transparentLabel}
                </label>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
                <button onClick={downloadQR} className={`${buttonClass} bg-brand-accent text-brand-dark justify-center`}>
                    <Download size={20} /> {t.downloadBtn}
                </button>
                <button onClick={downloadSVG} className={`${buttonClass} bg-brand-accent text-brand-dark justify-center`}>
                    <Download size={20} /> {t.downloadBtnSVG}
                </button>
                <button onClick={() => setIsShareModalOpen(true)} className={`${buttonClass} bg-white/10 text-white col-span-2 justify-center`}>
                    <Share2 size={20} /> {t.shareBtn}
                </button>
            </div>

            <div className="h-px bg-white/10 my-2" />

            <div className="flex flex-col gap-2">
                <label className={labelClass}>{t.logoLabel}</label>
                <div className="flex gap-2 mb-2">
                    <button
                        className={`${buttonClass} bg-white/10 text-white flex-1 relative overflow-hidden`}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {t.uploadLogo}
                    </button>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(36px,1fr))] gap-2 mb-2">
                    {Object.keys(SOCIAL_ICONS).map(type => (
                        <button
                            key={type}
                            className={`flex items-center justify-center p-2 rounded-lg border transition cursor-pointer ${selectedPreset === type ? 'bg-brand-accent text-brand-dark border-brand-accent' : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10 hover:text-white hover:-translate-y-0.5'}`}
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
                    <div className="flex justify-between items-center mt-2">
                        <label className={`flex items-center gap-2 cursor-pointer text-xs ${labelClass}`}>
                            <input
                                type="checkbox"
                                checked={useBrandColor}
                                onChange={(e) => setUseBrandColor(e.target.checked)}
                                className="w-4 h-4 rounded accent-brand-accent"
                            />
                            {t.brandColorLabel}
                        </label>
                        <button onClick={() => { setLogoImage(null); setCenterText(''); setSelectedPreset(null); }} className="text-red-500 hover:text-red-400 text-sm font-medium px-2 py-1">
                            {t.removeLogo}
                        </button>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label className={labelClass}>{t.centerTextLabel}</label>
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
                    className={inputClass}
                />
            </div>

            {logoImage && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>{t.logoSizeLabel}: {logoSize}px</label>
                        <input
                            type="range"
                            min="20"
                            max="100"
                            step="1"
                            value={logoSize}
                            onChange={(e) => setLogoSize(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={`flex items-center gap-3 cursor-pointer ${labelClass}`}>
                            <input
                                type="checkbox"
                                checked={logoExcavate}
                                onChange={(e) => setLogoExcavate(e.target.checked)}
                                className="w-5 h-5 rounded accent-brand-accent"
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
