import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupAction,
    SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
} from "#components/ui/sidebar";
import {ChevronDown, Plus} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "#components/ui/collapsible";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "#components/ui/dialog";
import {CreateSpaceDialog} from "#components/create-space-dialog";


export function MainSidebar() {
    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                Study Space
            </SidebarHeader>
            <SidebarContent>
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Spaces
                                <ChevronDown className="ml-2 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <SidebarGroupAction>
                            <CreateSpaceDialog />
                        </SidebarGroupAction>
                        <CollapsibleContent className="p-3">
                            <SidebarGroupContent>Compiler Construction</SidebarGroupContent>
                            <SidebarGroupContent>AI</SidebarGroupContent>
                            <SidebarGroupContent>BDA</SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>

            </SidebarContent>
            <SidebarFooter>

            </SidebarFooter>
        </Sidebar>
    )
}