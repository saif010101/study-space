import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { Button } from "#components/ui/button";
import {ButtonGroup} from "#components/ui/button-group";
import {DeleteIcon, PlusIcon, RecycleIcon, Trash2} from "lucide-react";
import {Input} from "#components/ui/input";
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "#components/ui/card";

function RoomMessagesArea() {
  return (
    <div className="p-4 h-full flex flex-col bg-gray-100">
      <header className="flex justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Change Room</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline">Current Room : AI</Button>
        <ButtonGroup aria-label="Button group">
          <Button variant="outline">
            Delete Room
            <Trash2/>
          </Button>
          <Button variant="outline">
            Create Room
            <PlusIcon/>
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
      <Input placeholder="Message"/>
      </footer>
    </div>
  );
}

export default RoomMessagesArea;
