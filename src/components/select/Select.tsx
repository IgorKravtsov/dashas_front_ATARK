import React, {FC} from 'react';
import styles from './select.module.scss';
import {IFertiliserPlant} from "../../models/IFertiliserPlant";
import Button from "../button/Button";
import {IFertiliser} from "../../models/IFertiliser";

export interface SelectProps {
    allData: any[];
    dataKey: string;
    dataValue: string;
    defaultValue: string | number;
    label?: string;
    onChange: Function;
}

const Select:FC<SelectProps> = (
    {
        allData,
        dataKey,
        defaultValue,
        dataValue,
        label,
        onChange
    }) => {

    const uniqueName = Date.now().toString();

    return (
        <>
            {label && <label className={styles.label} htmlFor={uniqueName}>{label}</label>}
            <select className={styles.select} defaultValue={defaultValue} id={uniqueName} onChange={(e) => onChange(e)}>
                {allData.map(data => {
                    return <option key={data[dataKey]} value={data[dataKey]}>{data[dataValue]}</option>
                })}
            </select>
        </>
    )

};

export default Select;