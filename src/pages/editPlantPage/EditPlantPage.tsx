import React, {ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import styles from './editPlantPage.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import useInput from "../../hooks/useInput";
import Input from "../../components/input/Input";
import Form from "../../components/form/Form";
import {IPlant} from "../../models/IPlant";
import Button from "../../components/button/Button";
import {isObjectEmpty} from "../../util";
import {useNavigate} from "react-router-dom";
import {UserRoles} from "../../models/userRoles";
import Select from "../../components/select/Select";
import cn from "classnames";

const EditPlantPage:FC = (): ReactElement => {

    const {plant} = useAppSelector(state => state.plantReducer);
    const {user} = useAppSelector(state => state.userReducer);
    const {fertilisers} = useAppSelector(state => state.fertiliserReducer);

    const [formValues, setFormValues] = useState(plant)

    const navigate = useNavigate();
    // const name = useInput(plant.name || ''),
    //     wateringQuantity = useInput(plant.wateringQuantity || ''),
    //     periodOfWatering = useInput(plant.periodOfWatering || ''),
    //     pruningPeriod = useInput(plant.pruningPeriod || ''),
    //     plantingDate = useInput(plant.plantingDate || '');

    useEffect(() => {
        console.log(plant);
        if(!isObjectEmpty(plant, 'id')) {
           navigate(-1);
        }
    }, [])

    const maxDate = new Date()


    const sendInfo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const plantInfoToSend: IPlant = {
            ...formValues,
            // name: name.value,
            // plantingDate: new Date(plantingDate.value),
        }
        console.log("plantInfoToSend...", plantInfoToSend);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
        const copyFormValues = {...formValues};
        // @ts-ignore
        copyFormValues[name] = e.target.value;
        setFormValues(copyFormValues);
    }

    const onChangeSelect = (selectId: number, index: number) => {
        console.log("selectId", selectId)
        console.log("index", index)
        const copyFormValues = {...formValues};
        if(copyFormValues.fertilisers) {
            console.log(copyFormValues.fertilisers[index].fertiliserId)
            // copyFormValues.fertilisers[index].fertiliserId = selectId;
        }
        setFormValues(copyFormValues);
    }

    const getType = (type: any): string => {
        console.log(type)
        return type
    }

    // const getRenderInputs = (): ReactElement[] => {
    //     let renderItems: ReactElement[] = [];
    //     for(const key in formValues) {
    //         if (key !== 'id' &&
    //             key !== 'fertilisers' &&
    //             key !== 'userId' &&
    //             key !== 'officeId' &&
    //             key !== 'lastPruningDate' &&
    //             key !== 'lastWateringTime' &&
    //             key !== 'plantingDate' &&
    //             key !== 'updatedAt' &&
    //             key !== 'createdAt'
    //         ) {
    //             renderItems.push(<Input
    //                 // @ts-ignore
    //                 value={formValues[key]}
    //                 label={key}
    //                 onChange={(e) => onChange(e, key)}
    //             />)
    //         }
    //          if (key === 'fertilisers') {
    //             // @ts-ignore
    //             const selects = formValues[key].filter(fertiliserInNowPlant =>
    //                 fertilisers.filter(fertiliserInDatabase => fertiliserInNowPlant.fertiliserId === fertiliserInDatabase.id))
    //             // renderItems.push(<Select allFertilisers={fertilisers}/>)
    //             const selectsToRender = selects.map(select =>
    //                 <Select
    //                     onChange={onChangeSelect}
    //                     fertiliserPlant={select}
    //                     allFertilisers={fertilisers}
    //                 />)
    //             // @ts-ignore
    //             renderItems.push(selectsToRender)
    //             renderItems.push(<Button classes={cn(styles.btn_add, {
    //                 [styles.btn_disabled]: selects.length === fertilisers.length,
    //             })} disabled={selects.length === fertilisers.length}>ADD</Button>)
    //         }
    //     }
    //     return renderItems;
    // }

    return (
        <main>
            <Form classes={styles.form} onSubmit={sendInfo}>
                {/*{formValues && getRenderInputs()}*/}
                {/*<Input value={} onChange={}/>*/}

                {/*<Button>SAVE</Button>*/}
            </Form>
        </main>
    );
};

export default EditPlantPage;