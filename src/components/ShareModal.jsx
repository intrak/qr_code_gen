import React from 'react';
import { Share2, Download, X, Copy } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, t, copyToClipboard, downloadQR, shareViaApi }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{t.shareTitle}</h2>
                    <button className="secondary" onClick={onClose} style={{ padding: '4px' }}>
                        <X size={24} />
                    </button>
                </div>
                <div className="modal-options">
                    <button className="modal-option-btn" onClick={copyToClipboard}>
                        <Copy size={20} /> {t.copyLink}
                    </button>
                    <button className="modal-option-btn" onClick={downloadQR}>
                        <Download size={20} /> {t.downloadBtn}
                    </button>
                    {navigator.share && (
                        <button className="modal-option-btn" onClick={shareViaApi}>
                            <Share2 size={20} /> {t.shareViaApi}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
