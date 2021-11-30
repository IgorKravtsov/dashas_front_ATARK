import {AppDispatch} from "../../index";
import {userSlice} from "../../slices";
import {UserService} from "../../../services/userService";
import {LocalstorageKey} from "../../../types/LocalstorageKey";
import {IUser} from "../../../models/IUser";
import jwtDecode from "jwt-decode";
import {UserRoles} from "../../../models/userRoles";


export const register = (email: string, password: string, role: UserRoles = UserRoles.USER, officeId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.setLoading(true));
        role = role || UserRoles.USER;
        console.log(officeId);

        const res = await UserService.register(email, password, role, officeId);
        const token = res.data;
        localStorage.setItem(LocalstorageKey.PLANTS_WATERING_TOKEN, token);

        const user: IUser = jwtDecode(token);
        dispatch(userSlice.actions.setUser(user));
        console.log("SUCCESS");

    } catch (e: any) {
        dispatch(userSlice.actions.setError(e.response?.data?.message))
        // console.log(e.response.data);
    } finally {
        dispatch(userSlice.actions.setLoading(false));
    }
}