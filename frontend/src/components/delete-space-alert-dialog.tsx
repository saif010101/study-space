import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "#components/ui/alert-dialog";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {setDialog} from "../store/slices/dialogSlice.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SpaceAPIService} from "../services/SpaceAPIService.ts";
import {toast} from "sonner";
import {Spinner} from "#components/ui/spinner";


export function DeleteSpaceAlertDialog() {
    const queryClient = useQueryClient();
    const dialog = useAppSelector((state) => state.dialogReducer.dialog);
    const currentSpace = useAppSelector((state) => state.spaceReducer.space);
    const dispatch = useAppDispatch();
    const spaceMutation = useMutation({
        mutationFn: () => SpaceAPIService.deleteSpace(currentSpace.space_id),
        onSuccess: async () => {
            // show success message
            toast.success('Space deleted successfully.');

            dispatch(setDialog("none"));

            // invalidate cache so that a refetch is trigger
            queryClient.invalidateQueries({queryKey: ["spaces"]});

        },
        onError: (error : any) => {
            toast.error(`Error: ${error.response.data.message}`);
        }
    });


    const handleDeleteClick = () => {
        toast.info('Deleting space...');
        spaceMutation.mutate();
     }

    return (
        <AlertDialog open={dialog === "delete-space-alert-dialog"}>
            <AlertDialogTrigger asChild>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-wrap">
                        This action cannot be undone. This will permanently delete the space.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={spaceMutation.isPending} onClick={() => dispatch(setDialog("none"))}>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={spaceMutation.isPending} onClick={handleDeleteClick} className="bg-red-700">
                        {spaceMutation.isPending && <Spinner className="size-4" />}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
