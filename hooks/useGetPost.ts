import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type PostQueryParams = {
    postId: string;
};

const getPost = async ({ postId }: PostQueryParams) => {
    const response = await axios.get(`/api/post/${postId}`);
    return response?.data;
};

export const useGetPost = (postId: string) => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: async () => await getPost({ postId }),
      })
};
