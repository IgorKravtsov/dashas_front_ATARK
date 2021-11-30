import {AppDispatch} from "../../index";
import {userSlice} from "../../slices";
import {UserService} from "../../../services/userService";
import {LocalstorageKey} from "../../../types/LocalstorageKey";
import {IUser} from "../../../models/IUser";
import jwtDecode from "jwt-decode";
import {officeService} from "../../../services/officeService";

export const getOfficesByUserId = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.setLoading(true));

        const res = await officeService.getOfficesByUserId(userId);
        dispatch(userSlice.actions.setOffices(res.data));

    } catch (e: any) {
        dispatch(userSlice.actions.setError(e.response?.data?.message || e.message))
        // console.log(e.response.data);
    } finally {
        dispatch(userSlice.actions.setLoading(false));
    }
}