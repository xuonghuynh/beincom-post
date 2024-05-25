import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type CommentQueryParams = {
    postId: string;
    content: string;
};

const commentOnPost = async ({ postId, content }: CommentQueryParams) => {
    const response = await axios.post("/api/comment", {
        postId,
        content,
    });
    return response?.data;
};

export const useComment = (postId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({postId, content}: CommentQueryParams) =>
            commentOnPost({ postId, content }),
        onSuccess: (data) => {
            queryClient.invalidateQueries();
            toast.success(data);
        },
        onError: (error) => {
            toast.error("Something went wrong");
            console.log(error);
        },
    });
};
