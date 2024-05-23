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
import parse from "html-react-parser";
import AvataAndName from "@/components/AvataAndName";


interface PostProps {
    post: Post & {
        author: User;
    };
}

const PostContent = ({ post }: PostProps) => {
    const content = generateHTML(JSON.parse(post.content!), [
        Document,
        Paragraph,
        Text,
        Bold,
        ListItem,
        BulletList,
        Heading,
    ]);
    return (
        <div>
            <AvataAndName name={post.author.name} email={post.author.email} image={post.author.image} publishedAt={post.publishedAt} />
            <div className="mt-4">{parse(content)}</div>
        </div>
    );
};

export default PostContent;
