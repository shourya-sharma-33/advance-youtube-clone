import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export const StudioSidebarHeader = () => {
    const { user } = useUser();

    if (!user)
        return (
            <SidebarHeader className="flex flex-col items-center justify-center pb-4">
                <Skeleton className="w-[112px] h-[112px] rounded-full" />
                <div className="flex flex-col items-center mt-2">
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-4 w-[100px] mt-1" />
                </div>
            </SidebarHeader>
        );

    const imageUrl = user.imageUrl;
    const name = user.fullName ?? "User";

    return (
        <SidebarHeader className="flex flex-col items-center justify-center pb-4">
            <Link href="/users/current">
                <UserAvatar
                    imageUrl={imageUrl}
                    name={name}
                    size="xl"
                    className="w-[112px] h-[112px] hover:opacity-80 transition-opacity"
                />
            </Link>

            <div className="flex flex-col items-center mt-2">
                <p className="text-sm font-medium">Your profile</p>
                <p className="text-xs text-muted-foreground">{name}</p>
            </div>
        </SidebarHeader>
    );
};
