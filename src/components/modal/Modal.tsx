import React, {FC} from 'react';
import styles from './modal.module.scss';
import cn from "classnames";

export interface ModalProps {
    classes?: string;
    active: boolean;
    setActive: Function;
}

const Modal:FC<ModalProps> = (
    {
        classes,
        active,
        setActive,
        children
    }
) => {
    return (
        <div className={cn(styles.modal, {
            [styles.modal_active]: active,
        })} onClick={() => setActive(false)}>

            <div className={cn(styles.modal__content, classes, {
                [styles.modal__content_active]: active,
            })} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;