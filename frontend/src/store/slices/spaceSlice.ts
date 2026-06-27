import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    space : {
        space_id : 1,
        name : 'space',
    }
};

export const spaceSlice = createSlice({
    name: 'space',
    initialState,
    reducers: {
        setSpace : (state, action: PayloadAction<{space_id: number, name: string}>) => {
            state.space = action.payload;
        }
    }
});

export const {setSpace} = spaceSlice.actions;
export default spaceSlice.reducer;