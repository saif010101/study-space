import { createRootRoute, Outlet } from '@tanstack/react-router';
import {Toaster} from "#components/ui/sonner";
import {DialogHost} from "../pages/dialog-host.tsx";


const RootLayout = () => (
  <>
      <Outlet/>
      <Toaster />
      <DialogHost/>
    {/*<TanStackRouterDevtools />*/}
  </>
)

export const Route = createRootRoute({ component: RootLayout })