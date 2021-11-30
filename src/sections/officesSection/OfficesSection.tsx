import React, {FC, useEffect} from 'react';
import styles from './officesSection.module.scss';
import {IOffice} from "../../models/IOffice";
import OfficeCard from "../../components/officeCard/OfficeCard";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getOfficesByUserId} from "../../store/actions/user/getOfficesByUserId";
import {isObjectEmpty} from "../../util";

export interface OfficesSectionProps {
}

const OfficesSection:FC<OfficesSectionProps> = (
    {

    }
) => {
    const {offices, user} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // if(offices.length === 0) {
            dispatch(getOfficesByUserId(user.id))
        // }
    }, [])

    if(offices.length === 0) {
        return <h1>YOU DON'T HAVE OFFICES YET</h1>
    }

    return (
        <>
            <h1>CHOOSE YOUR OFFICE</h1>
            <div className={styles.wrapper}>
                {offices.map(office => <OfficeCard office={office} key={office.id}/>)}
            </div>
        </>
    );
};

export default OfficesSection;