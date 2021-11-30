import {AppDispatch} from "../../index";
import {UserService} from "../../../services/userService";
import jwtDecode from "jwt-decode";
import {IUser} from "../../../models/IUser";
import {userSlice} from "../../slices";
import {LocalstorageKey} from "../../../types/LocalstorageKey";


export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.setLoading(true));

        const res = await UserService.login(email, password);
        const token = res.data;
        localStorage.setItem(LocalstorageKey.PLANTS_WATERING_TOKEN, token);

        const user: IUser = jwtDecode(token);
        dispatch(userSlice.actions.setUser(user));

    } catch (e: any) {
        dispatch(userSlice.actions.setError(e.response?.data?.message))
        // console.log(e.response.data);
    } finally {
        dispatch(userSlice.actions.setLoading(false));
    }
}