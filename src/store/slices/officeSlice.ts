import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPlant} from "../../models/IPlant";
import {IOffice} from "../../models/IOffice";


interface OfficeState {
    plants: IPlant[];
    offices: IOffice[];
    curOfficeId: number | undefined;
    // totalCount: number;
    isLoading: boolean;
    error: string;
}

const initialState: OfficeState = {
    plants: [],
    offices: [],
    curOfficeId: undefined,
    // totalCount: 0,
    isLoading: false,
    error: '',
}


export const officeSlice = createSlice({
    name: 'office',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setPlants(state, action: PayloadAction<IPlant[]>) {
            state.plants = action.payload;
            // state.isLoading = false;
            // state.error = '';
        },
        setOffices(state, action: PayloadAction<IOffice[]>) {
            state.offices = action.payload;
            // state.isLoading = false;
            // state.error = '';
        },
        setOfficeId(state, action: PayloadAction<number>) {
            state.curOfficeId = action.payload;
            // state.isLoading = false;
            // state.error = '';
        },
        // setTotalCount(state, action: PayloadAction<number>) {
        //     state.totalCount = action.payload;
        // },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})

export default officeSlice.reducer;