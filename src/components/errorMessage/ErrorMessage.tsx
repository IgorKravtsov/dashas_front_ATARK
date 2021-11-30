import React, {FC} from 'react';
import cn from 'classnames';
import styles from './errorMessage.module.scss';
import error from './img/error.svg';

export interface ErrorMessageProps {
    classes?: string;
    isVisible?: boolean;
}

const ErrorMessage:FC<ErrorMessageProps> = (
    {
        isVisible,
        classes,
        children
    }
) => {
    return (
        <div className={cn(styles.error, classes, {
            [styles.error_visible]: isVisible,
        })}>
            <img src={error} alt="error" className={styles.error_img}/>
            {children}
        </div>
    );
};

export default ErrorMessage;