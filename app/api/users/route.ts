import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const user = await getServerCurrentUser();

        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const users = await db.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.log("[GET_USERS] Error: ", error);
        return new NextResponse(`"Internal Server Error"`, { status: 500 });
    }
}