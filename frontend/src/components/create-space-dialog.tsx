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
import { Plus } from "lucide-react";
import { Field, FieldGroup } from "#components/ui/field";
import { Label } from "#components/ui/label";
import { Button } from "#components/ui/button";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";

export function CreateSpaceDialog() {

    const [name,setName] = useState<string>('');
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const spaceMutation = useMutation({
        mutationFn: () => return 0,
    });

  return (
    <Dialog>
      <form onSubmit={handleFormSubmit}>
        <DialogTrigger asChild>
          <Plus />
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Space</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new space.
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
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={name.trim().length === 0} type="submit">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
