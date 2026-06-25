import { createFileRoute } from '@tanstack/react-router'
import {SidebarInset} from "#components/ui/sidebar";
import {MainSidebar} from "#components/main-sidebar";
import RoomMessagesArea from "#components/room-messages-area";

function Home() {
  return (<>
    <MainSidebar />
    <SidebarInset>
        <RoomMessagesArea/>
    </SidebarInset>
  </>)
}

export const Route = createFileRoute('/home')({
  component: Home,
})
