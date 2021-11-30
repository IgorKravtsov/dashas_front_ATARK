import useInput from "./useInput";
import {useAppSelector} from "./redux";
import {useState} from "react";


export const useEditPlant = (propertyToEdit: string) => {
    const {plant} = useAppSelector(state => state.plantReducer);
    // @ts-ignore
    const prop = useInput(plant[propertyToEdit])

    return {
        value: prop.value,
        onChange: prop.onChange
    }
}