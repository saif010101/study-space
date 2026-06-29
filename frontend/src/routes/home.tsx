import { createFileRoute } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "#components/ui/sidebar";
import { MainSidebar } from "#components/main-sidebar";
import RoomMessagesArea from "#components/room-messages-area";

function Home() {
  return (
    <>
      <SidebarProvider>
        <MainSidebar />
        <SidebarInset>
          <RoomMessagesArea />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export const Route = createFileRoute("/home")({
  component: Home,

});
