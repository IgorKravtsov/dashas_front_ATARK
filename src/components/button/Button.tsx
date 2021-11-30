import React, {FC, HTMLProps, MouseEventHandler} from 'react';
import styles from './button.module.scss';
import cn from "classnames";

export interface ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    classes?: string;
}

const Button:FC<ButtonProps> = (
    {
        disabled=false,
        onClick,
        classes,
        children,
    }
) => {
    return (
        <button
            className={cn(styles.btn, classes)}
            disabled={disabled}
            onClick={onClick}
        >{children}</button>
    );
};

export default Button;