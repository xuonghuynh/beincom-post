import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { getServerCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DEFAULT_USER_LOGIN_REDIRECT } from "@/routes";

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
    console.log(user)
    if (!user) {
        console.log('object')
        redirect("/login");
    }
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={inter.className}>{children}</body>
            </html>
        </SessionProvider>
    );
}
