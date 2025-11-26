import { SearchInput } from "./search-input";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
export const HomeNavbar = () => {
    return (
        <nav>
            <div className="flex items-center flex-shrink-0">
                <SidebarTrigger />
                <Link href="/">
                    <div className="p-4 flex items-center gap-1">
                        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                        <p className="text-xl font-semibold tracking-tight">NewTube</p>
                    </div>
                </Link>
                {/* Search bar */}
                <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
                    <SearchInput />
                </div>
            </div>

            
        </nav>
    );
};
