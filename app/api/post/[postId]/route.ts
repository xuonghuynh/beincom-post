import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: { params: { postId: string }}) {
    try {
        const user = await getServerCurrentUser();
        const { postId } = params;

        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const post = await db.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true,
                likes: true,
                comments: {
                    include: {
                        author: true,
                    },
                },
            }
        });
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.log("[GET_POST_ID] Error: ", error);
        return new NextResponse(`"Internal Server Error"`, { status: 500 });
    }
}