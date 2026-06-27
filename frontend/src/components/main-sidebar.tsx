import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "#components/ui/sidebar";
import { ChevronDown, Plus, Settings } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#components/ui/collapsible";
import { SpaceAPIService } from "../services/SpaceAPIService.ts";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "#components/ui/skeleton";
import { SpaceSidebarActionsDropdown } from "#components/space-sidebar-actions-dropdown";
import { useAppDispatch } from "../store/hooks.ts";
import {setDialog} from "../store/slices/dialogSlice.ts";
import {setSpace} from "../store/slices/spaceSlice.ts";

export function MainSidebar() {
  const dispatch = useAppDispatch();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["spaces"],
    queryFn: () => SpaceAPIService.getSpaces(),
  });

  return (
    <Sidebar variant="inset">
      <SidebarHeader>Study Space</SidebarHeader>
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
              <Plus onClick={() => {dispatch(setDialog("create-space"))}} />
            </SidebarGroupAction>
            <CollapsibleContent className="p-3">
              {isLoading && (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[20px] w-full rounded-full bg-gray-300" />
                  <Skeleton className="h-[20px] w-full rounded-full bg-gray-300" />
                  <Skeleton className="h-[20px] w-full rounded-full bg-gray-300" />
                </div>
              )}
              <SidebarMenu>
                {!isLoading &&
                  isSuccess &&
                  data.map((space) => (
                    <SidebarMenuItem key={space.space_id}>
                      <SidebarMenuButton
                        isActive={space.space_id === data[0].space_id}
                      >
                        {space.name}
                      </SidebarMenuButton>
                      <SpaceSidebarActionsDropdown>
                        <SidebarMenuAction  showOnHover={true}>
                          <Settings onMouseEnter={() => dispatch(setSpace(space))}/>
                        </SidebarMenuAction>
                      </SpaceSidebarActionsDropdown>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
              {!isLoading && !isSuccess && <span>Error loading spaces</span>}
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
