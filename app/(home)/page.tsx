'use client';
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Home() {
    return (
        <div>
            <div
                className="flex cursor-pointer items-center"
                onClick={() => signOut()}
            >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </div>
        </div>
    );
}
