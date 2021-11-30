import {IFertiliser} from "../../models/IFertiliser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface OfficeState {
    fertilisers: IFertiliser[];
    isLoading: boolean;
    error: string;
}

const initialState: OfficeState = {
    fertilisers: [],
    isLoading: false,
    error: '',
}


export const fertiliserSlice = createSlice({
    name: 'office',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setFertilisers(state, action: PayloadAction<IFertiliser[]>) {
            state.fertilisers = action.payload;
            // state.isLoading = false;
            // state.error = '';
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})

export default fertiliserSlice.reducer;