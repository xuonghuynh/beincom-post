import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type PostQueryParams = {
    postId: string;
};

const getUsers = async () => {
    const response = await axios.get(`/api/users`);
    console.log(response?.data);
    return response?.data;
};

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => await getUsers(),
      })
};
