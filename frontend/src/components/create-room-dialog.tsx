import {Input} from "#components/ui/input";
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
import {Label} from "#components/ui/label";
import {Button} from "#components/ui/button";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {Spinner} from "#components/ui/spinner";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {setDialog} from "../store/slices/dialogSlice.ts";
import {RoomAPIService} from "../services/RoomAPIService.ts";

export function CreateRoomDialog () {

    const queryClient = useQueryClient();
    const dialog = useAppSelector((state) => state.dialogReducer.dialog);
    const  currentSpace = useAppSelector((state) => state.spaceReducer.space);
    const dispatch = useAppDispatch();
    const [name,setName] = useState<string>('');
    const roomMutation = useMutation({
        mutationFn: () => RoomAPIService.createRoom(currentSpace.space_id, name),
        onSuccess: async () => {
            // show success message
            toast.success('Room created successfully.');


            dispatch(setDialog("none"));
            setName('');

            // invalidate cache so that a refetch is trigger
            queryClient.invalidateQueries({queryKey: ["rooms"]});

        },
        onError: (error : any) => {
            toast.error(`Error: ${error.response.data.message}`);
        }
    });


    console.log(currentSpace,'sssssssssssss');
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast.info('Creating room...');
        roomMutation.mutate();

    }


  return (
    <Dialog open={dialog === "create-room"} >
      <form id="create-room-form" onSubmit={handleFormSubmit}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new room.
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
              <FieldDescription>Room name can be upto 50 characters.</FieldDescription>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={roomMutation.isPending} onClick={() => dispatch(setDialog("none"))} variant="outline">Cancel</Button>
            </DialogClose>
              <Button form="create-room-form" disabled={name.trim().length === 0 || roomMutation.isPending || name.trim().length > 50} type="submit">
                  {roomMutation.isPending && <Spinner className="size-4" />}
                  Create
              </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
