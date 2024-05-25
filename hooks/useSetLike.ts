import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useSetLike = (postId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId: string) =>
            axios.post("/api/like", { postId }).then((res) => res.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries();
            toast.success(data)
        },
        onError: (error) => {
            toast.error("Something went wrong");
            console.log(error);
        }
    });
};
