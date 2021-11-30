import {userSlice} from "../../slices";


export const setError = (error: string) => {
    return userSlice.actions.setError(error);
}