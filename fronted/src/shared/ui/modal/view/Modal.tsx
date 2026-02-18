import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import { Typography } from 'shared/ui/typography/view/Typography';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {title && (
                    <div className={styles.header}>
                        <Typography variant="h3">{title}</Typography>
                        <button
                            className={styles.closeButton}
                            onClick={onClose}
                        >
                            ×
                        </button>
                    </div>
                )}
                <div className={styles.content}>{children}</div>
            </div>
        </div>,
        document.body,
    );
};
