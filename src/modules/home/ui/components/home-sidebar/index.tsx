import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { MainSection } from "./main-section";
import { PersonalSection } from "./personal-section";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";

export const HomeSidebar = () => {
    return (
        <Sidebar className="pt-16 z-40 border-none">
            <Link href="/" className="py-7">
                <div className="px-3 flex items-center gap-1">
                    <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                    <p className="text-xl font-semibold tracking-tight">NewTube</p>
                    <SidebarTrigger />

                </div>
            </Link>

            <Separator />

            <SidebarContent className="bg-background">
                <MainSection />
                <Separator/>
                <PersonalSection/>
            </SidebarContent>
        </Sidebar>
    );
};
