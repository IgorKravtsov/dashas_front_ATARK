import {IPlant} from "../../models/IPlant";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PlantState {
    plant: IPlant;
    isLoading: boolean;
    error: string;
}

const initialState: PlantState = {
    plant: {} as IPlant,
    isLoading: false,
    error: '',
}


export const plantSlice = createSlice({
    name: 'plant',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setPlant(state, action: PayloadAction<IPlant>) {
            state.plant = action.payload;
            state.isLoading = false;
            state.error = '';
        },
        // setTotalCount(state, action: PayloadAction<number>) {
        //     state.totalCount = action.payload;
        // },
        setError(state, action: PayloadAction<string>) {
            // state.isLoading = false;
            state.error = action.payload;
        },

    }
})

export default plantSlice.reducer;