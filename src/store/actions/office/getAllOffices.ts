import {AppDispatch} from "../../index";
import {officeSlice} from "../../slices/officeSlice";
import {officeService} from "../../../services/officeService";


export const getAllOffices = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(officeSlice.actions.setLoading(true));
        const res = await officeService.getAllOffices();
        // console.log(res.data);
        dispatch(officeSlice.actions.setOffices(res.data));
        console.log(res)
        // dispatch(officeSlice.actions.setTotalCount(res.data));

    } catch (e: any) {
        dispatch(officeSlice.actions.setError(e.response?.data?.message))
        console.log(e.response?.data.message);
    } finally {
        dispatch(officeSlice.actions.setLoading(false));
    }
}