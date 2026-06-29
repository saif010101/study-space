import { useAppSelector } from "../store/hooks.ts";
import { CreateSpaceDialog } from "#components/create-space-dialog";
import { EditSpaceDialog } from "#components/edit-space-dialog";
import {DeleteSpaceAlertDialog} from "#components/delete-space-alert-dialog";
import {CreateRoomDialog} from "#components/create-room-dialog";

export const DialogHost = () => {
  const dialog = useAppSelector((state) => state.dialogReducer.dialog);

  if (dialog === "create-space") {
    return <CreateSpaceDialog />;
  } else if (dialog === "edit-space") {
    return <EditSpaceDialog />;
  } else if (dialog === "delete-space-alert-dialog") {
    return <DeleteSpaceAlertDialog />;
  } else if (dialog === "create-room") {
    return <CreateRoomDialog />;
  }

  return <></>;
};
