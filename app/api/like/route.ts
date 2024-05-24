import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { postId } = await req.json();
    const user = await getServerCurrentUser();
    const userId = user?.id;
    if (!userId || !postId) {
        return new NextResponse("Missing Required Fields", { status: 401 });
    }
    console.log(userId);
    console.log(postId);
    try {
        const existingLike = await db.like.findUnique({
            where: {
                userId_postId: {
                  userId,
                  postId,
                },
              },
        });
        console.log(existingLike)
        if (existingLike) {
            // Unlike the post
            await db.like.delete({ where: { id: existingLike.id } });
            return new Response('Post unliked');
          } else {
            // Like the post
            await db.like.create({ data: { userId, postId } });
            return new Response('Post liked');
          }
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
