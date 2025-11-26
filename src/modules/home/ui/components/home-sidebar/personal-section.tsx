"use client";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FlameIcon, History, HistoryIcon, HomeIcon, ListVideoIcon, PlaySquareIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";

const items = [
    {
        title: "History",
        url: "/playlist/history",
        icon: HistoryIcon,
    },
    {
        title: "Liked",
        url: "/playlist/liked",
        icon: ThumbsUpIcon,
    },
    {
        title: "All Playlists",
        url: "/playlists",
        icon: ListVideoIcon,
    },
];

export const PersonalSection = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton tooltip={item.title} asChild isActive={false}>
                                    <Link className="flex items-center gap-4" href={item.url}>
                                        <item.icon />
                                        <span className="text-sm">{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
        
        </SidebarGroup>
    );
};
