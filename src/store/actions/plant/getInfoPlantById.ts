import {AppDispatch} from "../../index";
import {plantSlice} from "../../slices/plantSlice";
import {plantService} from "../../../services/plantService";


export const getInfoPlantById = (plantId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(plantSlice.actions.setLoading(true));
        const res = await plantService.getInfoPlantById(plantId);
        dispatch(plantSlice.actions.setPlant(res.data));

    } catch (e: any) {
        dispatch(plantSlice.actions.setError(e.response?.data?.message || e.message))
        // console.log(e.response?.data.message);
    } finally {
        dispatch(plantSlice.actions.setLoading(false));
    }
}