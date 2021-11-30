import {AppDispatch} from "../../index";
import {fertiliserSlice} from "../../slices/fertiliserSlice";
import {fertiliserService} from "../../../services/fertiliserService";



export const getAllFertilisers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fertiliserSlice.actions.setLoading(true));
        const res = await fertiliserService.getAllFertilisers();
        dispatch(fertiliserSlice.actions.setFertilisers(res.data));
    } catch (e: any) {
        dispatch(fertiliserSlice.actions.setError(e.response?.data?.message || e.message))
    } finally {
        dispatch(fertiliserSlice.actions.setLoading(false));
    }
}