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
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SpaceAPIService} from "../services/SpaceAPIService.ts";
import {toast} from "sonner";
import {Spinner} from "#components/ui/spinner";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {setDialog} from "../store/slices/dialogSlice.ts";


export function EditSpaceDialog() {


    const queryClient = useQueryClient();
    const dialog = useAppSelector((state) => state.dialogReducer.dialog);
    const dispatch = useAppDispatch();
    const currentSpace = useAppSelector(state => state.spaceReducer.space);
    const [name,setName] = useState<string>(currentSpace.name);
    const spaceMutation = useMutation({
        mutationFn: () => SpaceAPIService.editSpace(currentSpace.space_id, name),
        onSuccess: async () => {
            // show success message
            toast.success('Space updated successfully.');

            dispatch(setDialog("none"));
            setName('');

            // invalidate cache so that a refetch is trigger
            queryClient.invalidateQueries({queryKey: ["spaces"]});

        },
        onError: (error : any) => {
            toast.error(`Error: ${error.response.data.message}`);
        }
    });


    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast.info('Updating space info....');
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
              <Button disabled={spaceMutation.isPending} onClick={() => dispatch(setDialog("none"))} variant="outline">Cancel</Button>
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
