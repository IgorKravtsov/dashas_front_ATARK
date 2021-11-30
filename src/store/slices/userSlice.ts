import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOffice} from "../../models/IOffice";


interface UserState {
    isAuth: boolean;
    user: IUser;
    offices: IOffice[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    user: {} as IUser,
    offices: [],
    isLoading: false,
    isAuth: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            state.isAuth = true;
            state.isLoading = false;
            state.error = '';
        },
        setOffices(state, action: PayloadAction<IOffice[]>) {
            state.offices = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },

    }
})

export default userSlice.reducer;