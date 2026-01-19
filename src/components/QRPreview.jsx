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
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-2xl mx-auto min-h-[500px] bg-white/5 rounded-[32px] p-8 md:sticky md:top-[50vh] md:-translate-y-1/2 md:max-h-[90vh] md:overflow-y-auto mt-8 md:mt-0">
            <div
                className={`bg-white p-6 rounded-3xl flex items-center justify-center shadow-2xl transition-transform hover:-translate-y-1 ${['left', 'right'].includes(tagPosition) ? 'flex-row gap-4' : 'flex-col'}`}
                ref={qrRef}
                style={{ background: isTransparent ? 'transparent' : bgColor }}
            >
                {showTag && tagPosition === 'left' && (
                    <div
                        className={`bg-brand-dark text-white py-6 px-2 rounded-xl font-bold uppercase tracking-wider whitespace-nowrap [writing-mode:vertical-rl] ${tagRotation === 180 ? 'rotate-180' : ''}`}
                        style={{ background: fgColor, fontSize: `${tagFontSize}rem` }}
                    >
                        {tagText}
                    </div>
                )}

                <div className="flex flex-col items-center">
                    {showTag && tagPosition === 'top' && (
                        <div
                            className="bg-brand-dark text-white px-6 py-2 rounded-xl font-bold uppercase tracking-wider whitespace-nowrap mb-4"
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
                            className="bg-brand-dark text-white px-6 py-2 rounded-xl font-bold uppercase tracking-wider whitespace-nowrap mt-4"
                            style={{ background: fgColor, fontSize: `${tagFontSize}rem` }}
                        >
                            {tagText}
                        </div>
                    )}

                    {showCaption && (
                        <div
                            className="mt-3 font-medium text-center max-w-[256px] break-all"
                            style={{ fontSize: `${captionFontSize}rem`, color: captionColor }}
                        >
                            {captionText}
                        </div>
                    )}
                </div>

                {showTag && tagPosition === 'right' && (
                    <div
                        className={`bg-brand-dark text-white py-6 px-2 rounded-xl font-bold uppercase tracking-wider whitespace-nowrap [writing-mode:vertical-rl] ${tagRotation === 180 ? 'rotate-180' : ''}`}
                        style={{ background: fgColor, fontSize: `${tagFontSize}rem` }}
                    >
                        {tagText}
                    </div>
                )}
            </div>

            <p className="text-text-secondary text-sm">
                {t.livePreview} {isTransparent ? `(${t.transparent})` : ''}
            </p>
        </div>
    );
};

export default QRPreview;
