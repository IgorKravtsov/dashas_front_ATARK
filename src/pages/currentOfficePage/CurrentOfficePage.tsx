import React, {useEffect, useState} from 'react';
import styles from './currentOfficePage.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useNavigate, useParams} from "react-router-dom";
import {getPlantsByUserAndOffice} from "../../store/actions/office/getPlantsByUserAndOffice";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import {decodeJWT, getUserFromLocalstorage} from "../../util";
import {isObjectEmpty} from "../../util";
import {LocalstorageKey} from "../../types/LocalstorageKey";
import {userSlice} from "../../store/slices";
import Modal from "../../components/modal/Modal";
import EditCreatePlantSection from "../../sections/editCreatePlantSection/EditCreatePlantSection";
import {IPlant} from "../../models/IPlant";
import {plantSlice} from "../../store/slices/plantSlice";
import EditCreatePlantModal from "../../components/modal/editCreatePlantModal/EditCreatePlantModal";
import {RouteNames} from "../../routes";
import {officeSlice} from "../../store/slices/officeSlice";
import {fertiliserSlice} from "../../store/slices/fertiliserSlice";
import {getAllFertilisers} from "../../store/actions/fertiliser/getAllFertilisers";
import {getAllOffices} from "../../store/actions/office/getAllOffices";
import {plantService} from "../../services/plantService";


const CurrentOfficePage = () => {

    const {officeId} = useParams();
    const {plants, error} = useAppSelector(state => state.officeReducer)
    const {user} = useAppSelector(state => state.userReducer)
    const {plant} = useAppSelector(state => state.plantReducer)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const user = getUserFromLocalstorage();
        user && userSlice.actions.setUser(user);
        dispatch(getAllFertilisers());
        dispatch(getAllOffices());
    }, [])

    useEffect(() => {
        if(isObjectEmpty(user, 'id')) {
            if(officeId) {
                const curOfficeId = parseInt(officeId);
                dispatch(getPlantsByUserAndOffice(user.id, curOfficeId))
                officeSlice.actions.setOfficeId(curOfficeId);
            }
        } else {
            navigate(-1);
        }
    }, [user])

    const editPlant = (plant: IPlant) => {
        dispatch(plantSlice.actions.setPlant(plant));
        navigate(RouteNames.INFO_PLANT);
        // setCurrentPlant(plant);
        // setActiveCreateEditModal(true);
    }

    const addPlant = () => {
        dispatch(plantSlice.actions.setPlant({} as IPlant));
        navigate(RouteNames.ADD_PLANT);
        // // setCurrentPlant(undefined);
        // setActiveCreateEditModal(true);
    }

    if(error !== '') {
        return <h2>{error}</h2>
    }

    if(!plants || plants?.length === 0) {
        return (
            <div className={styles.no_plants}>
                <h1>No plants in this office yet</h1>
                <Button classes={styles.no_plants_btn} onClick={addPlant}>ADD</Button>
            </div>
        )
    }

    const deletePlant = async (plantId: number) => {
        await plantService.deleteOne(plantId);
        if(officeId) {
            dispatch(getPlantsByUserAndOffice(user.id, parseInt(officeId)))
        }
    }

    return (
        <Container>
            <div className={styles.title_btn_wrapper}>
                <h2>CHOOSE THE PLANT</h2>
                <Button onClick={addPlant}>ADD</Button>
            </div>

            <div className={styles.plantListItem_header}>
                <p>№</p>
                <p>PLANT NAME</p>
                <p>ACTION</p>
            </div>
            <ul className={styles.plantList}>
                {plants && plants.map((plant, index) => (
                    <li key={plant.id} className={[styles.plantListItem, index % 2 === 1 ? styles.plantListItem_grey : ''].join(' ')}>
                        <p className={styles.plantListItem_text}>{index + 1}</p>
                        <p className={styles.plantListItem_text}>{plant.name}</p>
                        <div className={styles.edit_btn_wrapper}>
                            <Button onClick={() => deletePlant(plant.id)}>Delete</Button>
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default CurrentOfficePage;