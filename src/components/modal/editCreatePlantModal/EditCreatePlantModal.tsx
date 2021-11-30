import React, {FC} from 'react';
import EditCreatePlantSection from "../../../sections/editCreatePlantSection/EditCreatePlantSection";
import {isObjectEmpty} from "../../../util";
import Modal from "../Modal";
import {IPlant} from "../../../models/IPlant";

export interface EditCreatePlantModalProps {
    active: boolean;
    plant?: IPlant;
    setActive: Function;
    classes?:string;
}

const EditCreatePlantModal:FC<EditCreatePlantModalProps> = (
    {
        active ,
        plant ,
        setActive ,
        classes,
    }
) => {
    const isPlantNotEmpty = plant && isObjectEmpty(plant, 'id')

    return (
        <Modal classes={classes} active={active} setActive={setActive}>
            <EditCreatePlantSection
                // plant={plant}
                title={isPlantNotEmpty ? "Edit Plant" : "Add Plant"}/>
        </Modal>
    );
};

export default EditCreatePlantModal;