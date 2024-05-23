import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const user = await getServerCurrentUser();
        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const posts = await db.post.findMany({
            include: {
                author: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(posts, { status: 200 })
    } catch (error) {
        console.log("GET_POSTS_ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const user = await getServerCurrentUser();
        const { content } = await req.json();
        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const product = await db.post.create({
            data: {
                content,
                authorId: user.id,
                published: true,
                publishedAt: new Date()
            }
        })

        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        console.log("CREATE_POST_ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}