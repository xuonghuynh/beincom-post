import { Like, Post } from "@prisma/client"
import { User } from "next-auth"

export type PostProps = Post & {
    author: User,
    comments: Comment[],
    likes: Like[]
}

export type PostChildProps = {
    post: Post & {
        author: User,
        comments: Comment[],
        likes: Like[]
    }
}