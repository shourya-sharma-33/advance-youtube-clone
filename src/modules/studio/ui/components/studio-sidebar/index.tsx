import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { MainSection } from "./main-section";
import { PersonalSection } from "./personal-section";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";

export const StudioSidebar = () => {
    return (
        
        <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
             <SidebarContent className="bg-background">
                <MainSection />
                <Separator/>
                <PersonalSection/>
            </SidebarContent>
        </Sidebar>

    );
};
