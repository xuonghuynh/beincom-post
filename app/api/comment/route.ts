import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { postId, content } = await req.json();
    const user = await getServerCurrentUser();
    const userId = user?.id;
    if (!userId || !postId) {
        return new NextResponse("Missing Required Fields", { status: 401 });
    }
    try {
        const comment = await db.comment.create({
            data: {
                content,
                authorId: userId,
                postId
            }
        })

        return NextResponse.json("You just created a comment", { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}