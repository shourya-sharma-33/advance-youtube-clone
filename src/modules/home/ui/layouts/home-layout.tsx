import { SidebarProvider } from "@/components/ui/sidebar"
import { HomeNavbar } from "../components/home-navbar/index"

interface HomeLayoutProps {
    children : React.ReactNode
}

export const HomeLayout = ({ children }: HomeLayoutProps)  => {
    return (
        <SidebarProvider>
            <div>
                <HomeNavbar/>
            </div>
            {children}
        </SidebarProvider>
    )
}