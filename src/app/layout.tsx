import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
const outfit = Outfit({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Gen erated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
        <html lang="en">
            <body className={outfit.className}>
                <TRPCProvider>

                        {children}

                </TRPCProvider>
            </body>
        </html>
        </ClerkProvider>
    );
}
 