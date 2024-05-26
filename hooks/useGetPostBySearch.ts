import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type PostQueryParams = {
    content: string;
    date?: {
        from: string | null;
        to: string | null;
    }
};

const getPosts = async ({ content, date }: PostQueryParams) => {
    const response = await axios.post(`/api/search`, { content, date });
    return response?.data;
};

export const useGetPostBySearch = ({content, date}: PostQueryParams ) => {
    return useQuery({
        queryKey: ['postsBySearch', {content, date}],
        queryFn: async () => await getPosts({ content, date }),
        staleTime: 0,
      })
};
