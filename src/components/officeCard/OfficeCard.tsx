import React, {FC} from 'react';
import styles from './officeCard.module.scss';
import {IOffice} from "../../models/IOffice";
import officeImg from './img/officeImg.png';
import {Link} from "react-router-dom";

export interface OfficeCardProps {
    office: IOffice;
}

const OfficeCard:FC<OfficeCardProps> = (
    {
        office: {name, address, id},
    }
) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.img_wrapper}>
                <img className={styles.img} src={officeImg} alt={address}/>
            </p>
            <h5 className={styles.name}>{name}</h5>
            <div className={styles.address_wrapper}>
                <h5>{address}</h5>
            </div>
            <div className={styles.link_wrapper}>
                <Link className={styles.link} to={`/office/${id}`}>Open full page</Link>
            </div>
        </div>
    );
};

export default OfficeCard;