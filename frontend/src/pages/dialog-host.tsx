import { useAppSelector } from "../store/hooks.ts";
import { CreateSpaceDialog } from "#components/create-space-dialog";
import { EditSpaceDialog } from "#components/edit-space-dialog";

export const DialogHost = () => {
  const dialog = useAppSelector((state) => state.dialogReducer.dialog);

  if (dialog === "create-space") {
    return <CreateSpaceDialog />;
  } else if (dialog === "edit-space") {
    return <EditSpaceDialog />;
  }

  return <></>;
};
