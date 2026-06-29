import {Pencil, Settings, Trash} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { useAppDispatch } from "../store/hooks.ts";
import { setDialog } from "../store/slices/dialogSlice.ts";



export function SpaceSidebarActionsDropdown() {
  const dispatch = useAppDispatch();
  return (
    <DropdownMenu >
      <DropdownMenuTrigger >
          <Settings className="size-5"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => dispatch(setDialog("edit-space"))}>
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={() => dispatch(setDialog("delete-space-alert-dialog"))}>
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
