import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type PostQueryParams = {
    take?: number;
    lastCursor?: string;
};

const allPosts = async ({ take, lastCursor }: PostQueryParams) => {
    const response = await axios.get("/api/post", {
        params: { take, lastCursor },
    });
    return response?.data;
};

export const usePosts = () => {
    return useInfiniteQuery({
        queryFn: ({ pageParam = "" }) =>
            allPosts({ take: 5, lastCursor: pageParam }),
        queryKey: ["posts"],
        getNextPageParam: (lastPage) => {
            return lastPage?.metaData.lastCursor;
        },
        initialPageParam: "",
    });
};
