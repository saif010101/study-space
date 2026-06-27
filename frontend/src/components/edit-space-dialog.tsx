import { Input } from "#components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#components/ui/dialog";
import {Field, FieldDescription, FieldGroup} from "#components/ui/field";
import { Label } from "#components/ui/label";
import { Button } from "#components/ui/button";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {SpaceAPIService} from "../services/SpaceAPIService.ts";
import {toast} from "sonner";
import {Spinner} from "#components/ui/spinner";
import {useSelector} from "react-redux";
import type {RootState} from "../store";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {setDialog} from "../store/slices/dialogSlice.ts";


export function EditSpaceDialog() {

    const dialog = useAppSelector((state) => state.dialogReducer.dialog);
    const dispatch = useAppDispatch();
    const currentSpace = useSelector((state: RootState) => state.spaceReducer.space);
    const [name,setName] = useState<string>(currentSpace.name);
    const spaceMutation = useMutation({
        mutationFn: () => SpaceAPIService.createSpace(name),
        onSuccess: () => {
            toast.success('Space created successfully.');
            dispatch(setDialog("none"));
            setName('');
        },
        onError: (error : any) => {
            toast.error(`Error: ${error.response.data.message}`);
        }
    });



    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast.info('Creating space...');
        spaceMutation.mutate();

    }


  return (
    <Dialog open={dialog === "edit-space"} >
      <form id="create-space-form" onSubmit={handleFormSubmit}>
        <DialogTrigger asChild>

        </DialogTrigger>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Edit Space</DialogTitle>
            <DialogDescription>
              Fill in the details to edit the space.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
              <FieldDescription>Space name can be upto 50 characters.</FieldDescription>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => dispatch(setDialog("none"))} variant="outline">Cancel</Button>
            </DialogClose>
              <Button form="create-space-form" disabled={name.trim().length === 0 || spaceMutation.isPending || name.trim().length > 50} type="submit">
                  {spaceMutation.isPending && <Spinner className="size-4" />}
                  Edit
              </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
