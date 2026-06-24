import { Outlet } from "@tanstack/react-router";
import {Button} from "#components/ui/button";
import {Alert, AlertAction, AlertDescription, AlertTitle} from "#components/ui/alert";
import {InfoIcon} from "lucide-react";

function App() {
  return (
    <>
    <Outlet />

    </>
  );
}

export default App;
