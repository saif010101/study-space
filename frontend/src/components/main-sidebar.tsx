import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "#components/ui/sidebar";
import { ChevronDown, Plus} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#components/ui/collapsible";
import { SpaceAPIService } from "../services/SpaceAPIService.ts";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "#components/ui/skeleton";
import { useAppDispatch } from "../store/hooks.ts";
import {setDialog} from "../store/slices/dialogSlice.ts";
import {setSpace} from "../store/slices/spaceSlice.ts";
import {useState} from "react";

export function MainSidebar() {
  const [activeSpace, setActiveSpace] = useState<number>();
  const dispatch = useAppDispatch();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["spaces"],
    queryFn: () => SpaceAPIService.getSpaces(),
  });

  const handleMenuItemClick = (space_id: number,name: string) => {
    setActiveSpace(space_id);
    dispatch(setSpace({space_id, name}));
  }

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
                  data.map((user_space) => (
                    <SidebarMenuItem key={user_space.space.space_id}>
                      <SidebarMenuButton
                        isActive={user_space.space.space_id === activeSpace}
                        onClick={() => handleMenuItemClick(user_space.space.space_id, user_space.space.name)}
                      >
                        {user_space.space.name}
                      </SidebarMenuButton>
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
