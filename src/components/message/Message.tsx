import React, {FC} from 'react';
import styles from './message.module.scss';
import cn from "classnames";

export interface MessageProps {
    message: string;
    classes?: string;
    isVisible?: boolean;
}

const Message:FC<MessageProps> = ({message, classes, isVisible=true}) => {
    return (
        <div className={cn(styles.wrapper, classes, {[styles.visible]: isVisible})}>
            <p className={styles.text}>{message}</p>
        </div>
    );
};

export default Message;