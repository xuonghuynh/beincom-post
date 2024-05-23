import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { getServerCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/(home)/_components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/ultils/providers/ReactQuery";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BIC Test",
    description: "Beincom please hire me !!!",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    const user = await getServerCurrentUser();
    if (!user) {
        redirect("/login");
    }
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={inter.className}>
                    <Toaster />
                    <Navbar />
                    <div className="bg-gray-100 h-full">
                        <ReactQueryProvider>{children}</ReactQueryProvider>
                    </div>
                </body>
            </html>
        </SessionProvider>
    );
}
