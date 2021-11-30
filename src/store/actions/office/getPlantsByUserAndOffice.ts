import {AppDispatch} from "../../index";
import {officeSlice} from "../../slices/officeSlice";
import {officeService} from "../../../services/officeService";


export const getPlantsByUserAndOffice = (userId: number, officeId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(officeSlice.actions.setLoading(true));
        const res = await officeService.getPlantsByUserAndOffice(userId, officeId);
        // console.log(res.data);
        dispatch(officeSlice.actions.setPlants(res.data));
        // dispatch(officeSlice.actions.setTotalCount(res.data));

    } catch (e: any) {
        dispatch(officeSlice.actions.setError(e.response?.data?.message))
        console.log(e.response?.data.message);
    } finally {
        dispatch(officeSlice.actions.setLoading(false));
    }
}