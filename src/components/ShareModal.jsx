import React from 'react';
import { Share2, Download, X, Copy } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, t, copyToClipboard, downloadQR, shareViaApi }) => {
    if (!isOpen) return null;

    const btnClass = "w-full flex items-center justify-start bg-white/5 text-white p-4 rounded-xl transition hover:bg-white/10 gap-3 font-semibold";

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn" onClick={onClose}>
            <div className="bg-brand-dark p-8 rounded-3xl w-[90%] max-w-md border border-white/10 shadow-2xl animate-slideUp" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-br from-white to-brand-accent bg-clip-text text-transparent">{t.shareTitle}</h2>
                    <button className="text-white p-1 rounded-lg hover:bg-white/10 transition" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <button className={btnClass} onClick={copyToClipboard}>
                        <Copy size={20} /> {t.copyLink}
                    </button>
                    <button className={btnClass} onClick={downloadQR}>
                        <Download size={20} /> {t.downloadBtn}
                    </button>
                    <button className={btnClass} onClick={downloadSVG}>
                        <Download size={20} /> {t.downloadBtnSVG}
                    </button>
                    {navigator.share && (
                        <button className={btnClass} onClick={shareViaApi}>
                            <Share2 size={20} /> {t.shareViaApi}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
