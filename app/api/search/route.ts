import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getServerCurrentUser();

        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { content, date } = await req.json();

        const post = await db.post.findMany({
            where: {
                content: {
                    contains: content,
                    mode: 'insensitive'
                },
                createdAt: {
                    ...(date && date.from && date.to ? {
                        gte: new Date(date.from),
                        lt: new Date(date.to),
                      } : {}),
                }
            },
            include: {
                author: true,
                likes: true,
                comments: {
                    include: {
                        author: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.log("[SEARCH] Error: ", error);
        return new NextResponse(`"Internal Server Error"`, { status: 500 });
    }
}