import { createRootRoute, Outlet } from '@tanstack/react-router';
import {Toaster} from "#components/ui/sonner";


const RootLayout = () => (
  <>
      <Outlet/>
      <Toaster />
    {/*<TanStackRouterDevtools />*/}
  </>
)

export const Route = createRootRoute({ component: RootLayout })