import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type PostQueryParams = {
    content: string;
};

const getPosts = async ({ content }: PostQueryParams) => {
    const response = await axios.post(`/api/search`, { content });
    return response?.data;
};

export const useGetPostBySearch = (content: string) => {
    return useQuery({
        queryKey: ['postsBySearch', content],
        queryFn: async () => await getPosts({ content }),
      })
};
