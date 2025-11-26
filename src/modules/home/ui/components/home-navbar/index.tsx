import { SearchInput } from "./search-input";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
export const HomeNavbar = () => {
    return (
        <nav>
            <div className="flex items-center flex-shrink-0 my-2 mx-5">
                <SidebarTrigger className="z-[10000]" />

                <Link href="/">
                    <div className="px-3 flex items-center gap-1">
                        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                        <p className="text-xl font-semibold tracking-tight">NewTube</p>
                    </div>
                </Link>
                {/* Search bar */}
                <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
                    <SearchInput />
                </div>
                <div className="
                    flex-shrink-0 items-center flex gap-4
                ">
                    <AuthButton/>
                </div>
            </div>

            
        </nav>
    );
};
