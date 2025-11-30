import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import { SidebarHeader } from "@/components/ui/sidebar";

export const StudioSidebarHeader = () => {
    const { user } = useUser();

    if (!user) return null;

    const imageUrl = user.imageUrl;
    const name = user.fullName ?? "User";

    return (
        <SidebarHeader className="flex items-center justify-center pb-4">
            <Link href="/users/current">
                <UserAvatar
                    imageUrl={imageUrl}
                    name={name}
                    size="xl"
                    className="size-[112px] hover:opacity-80 transition-opacity"
                />
            </Link>
        </SidebarHeader>
    );
};
