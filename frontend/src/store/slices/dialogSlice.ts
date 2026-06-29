import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type dialogType = "create-space" | "edit-space" | "delete-space-alert-dialog" | "create-room" | "none";

const initialState: { dialog: dialogType } = {
  dialog: "none",
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setDialog: (
      state,
      action: PayloadAction<dialogType>
    ) => {
      state.dialog = action.payload;
    }
  }
});

export const { setDialog } = dialogSlice.actions;
export default dialogSlice.reducer;

