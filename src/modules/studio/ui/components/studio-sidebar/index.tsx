"use client";
import { MainSection } from "./main-section";
import { PersonalSection } from "./personal-section";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"; // adjust path to where your sidebar components live

import { LogOutIcon, VideoIcon } from "lucide-react"; // or wherever your icon comes from
import { usePathname } from "next/navigation";
import { StudioSidebarHeader } from "./studio-sidebar-header";

export const StudioSidebar = () => {

    const pathname = usePathname();

    return (
        <>
        <Sidebar className="py-14 z-40" collapsible="icon">
                <StudioSidebarHeader />

      <SidebarContent className="bg-background">
                
              
        <SidebarGroup>
          <SidebarMenu>

                        <SidebarMenuItem >
                            <SidebarMenuButton isActive={pathname === "/studio"} tooltip="Exit studio" asChild>
                                <Link href="/studio/videos">
                                    <VideoIcon className="size-5" />
                                    <span className="text-sm">Content</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
            <SidebarMenuItem >
              <SidebarMenuButton  tooltip="Exit studio" asChild>
                <Link href="/studio/videos">
                  <LogOutIcon className="size-5"/>
                  <span className="text-sm">Exit studio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
        </>

    );
};
