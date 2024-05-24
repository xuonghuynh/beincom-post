import { Post, User } from "@prisma/client";
import React from "react";
import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import parse from "html-react-parser";
import AvataAndName from "@/components/AvataAndName";
import PostAction from "@/components/PostAction";
import { PostChildProps } from "@/types/types";
import CommentAction from "@/components/CommentAction";
import ShowComment from "@/components/ShowComment";

const PostContent = ({ post }: PostChildProps) => {
    const content = generateHTML(JSON.parse(post.content!), [
        Document,
        Paragraph,
        Text,
        Bold,
        ListItem,
        BulletList,
        Heading,
        TextStyle,
        Link,
        Underline,
        Italic
    ]);
    return (
        <div>
            <AvataAndName name={post.author.name} email={post.author.email} image={post.author.image} publishedAt={post.publishedAt} />
            <div className="mt-4">{parse(content)}</div>
            <PostAction post={post} />
            <ShowComment post={post} />
            <CommentAction post={post} />
        </div>
    );
};

export default PostContent;
