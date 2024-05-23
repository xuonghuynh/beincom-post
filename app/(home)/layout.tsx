import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { getServerCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DEFAULT_USER_LOGIN_REDIRECT } from "@/routes";
import Navbar from "@/app/(home)/_components/Navbar";

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
    const user = await getServerCurrentUser()
    if (!user) {
        redirect("/login");
    }
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={inter.className}>
                    <Navbar />
                    <div className="bg-gray-100 h-full">{children}</div>
                </body>
            </html>
        </SessionProvider>
    );
}
