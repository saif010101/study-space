import { Button } from "#components/ui/button";
import { ButtonGroup } from "#components/ui/button-group";
import { PlusIcon, Trash2 } from "lucide-react";
import { Input } from "#components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/card";
import { RoomSelectDropdown } from "#components/room-select-dropdown";
import { Separator } from "#components/ui/separator";
import { SpaceSidebarActionsDropdown } from "#components/space-sidebar-actions-dropdown";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { setDialog } from "../store/slices/dialogSlice.ts";

function RoomMessagesArea() {
  const currentSpace = useAppSelector((state) => state.spaceReducer.space);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 h-full flex flex-col bg-gray-100">
      <header className="flex justify-between items-center gap-3">
        <RoomSelectDropdown />
        <div className="py-1 px-2 flex gap-2 items-center mr-auto rounded-lg bg-white">
          <span className="text-sm font-medium">{currentSpace.name}</span>
          <Separator orientation="vertical" />
          <SpaceSidebarActionsDropdown />
        </div>
        <ButtonGroup aria-label="Button group">
          <Button variant="destructive">
            Delete Room
            <Trash2 />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              dispatch(setDialog("create-room"));
            }}
          >
            Create Room
            <PlusIcon />
          </Button>
        </ButtonGroup>
      </header>
      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>yakamashi</CardTitle>
            <CardDescription>3/18/25, 8:22 AM</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Hello everyone!</p>
          </CardContent>
        </Card>
      </main>
      <footer className="mt-auto">
        <Input placeholder="Message" />
      </footer>
    </div>
  );
}

export default RoomMessagesArea;
