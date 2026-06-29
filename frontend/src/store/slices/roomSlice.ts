import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    room : null
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom : (state, action: PayloadAction<{room_id: number, name: string} | null>) => {
            state.room = action.payload;
        }
    }
});

export const {setRoom} = roomSlice.actions;
export default roomSlice.reducer;