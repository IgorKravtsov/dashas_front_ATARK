import React, {FC, FormEvent} from 'react';
import styles from './form.module.scss';
import cn from "classnames";

export interface FormProps {
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    classes?: string;
}

const Form:FC<FormProps> = (
    {
        onSubmit,
        classes,
        children
    }) => {
    return (
        <form className={cn(styles.wrapper, classes)} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;