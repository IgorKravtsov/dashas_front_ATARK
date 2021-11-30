import React, {DetailedHTMLProps, FC, InputHTMLAttributes} from 'react';
import styles from './input.module.scss';
import cn from "classnames";

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    classes?: string;
}

const Input: FC<InputProps> = (props) => {
    const uniqueId = Date.now().toString()
    return (
        <>
            {props.label && <label className={styles.label} htmlFor={uniqueId}>{props.label}</label>}
            <input {...props} id={uniqueId} className={cn(styles.input, props.classes)}/>
        </>
    );
};

export default Input;