import React, {FC, FormEvent, useEffect, useState} from 'react';
import styles from './editCreatePlantSection.module.scss';
import {IPlant} from "../../models/IPlant";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import useInput from "../../hooks/useInput";
import Button from "../../components/button/Button";
import {useAppSelector} from "../../hooks/redux";
import {useEditPlant} from "../../hooks/useEditPlant";

export interface EditCreatePlantSectionProps {
    // plant?: IPlant;
    title: string;
    // isActive: boolean;
}

const EditCreatePlantSection:FC<EditCreatePlantSectionProps> = (
    {
        // plant,
        title,
    }) => {
    // let curPlant = plant

    const {plant} = useAppSelector(state => state.plantReducer);
    const name = useEditPlant('name');
    // let name = useInput(plant.name);
    let wateringQuantity = useInput(plant?.wateringQuantity?.toString() || '200');

    useEffect(() => {
        // console.log("name.value....",name.value)
    }, [plant])

    const sendData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("PLANT....",plant)
    }

    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            <Form classes={styles.wrapper} onSubmit={sendData}>
                <Input {...name} placeholder="Name..."/>
                <label className={styles.label} htmlFor="wateringQuantity">Quantity of watering per minute...</label>
                <Input {...wateringQuantity} id="wateringQuantity" type="number"/>
                <Button>SEND</Button>
            </Form>
        </>
    );
};

export default EditCreatePlantSection;