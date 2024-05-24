import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useSetLike = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId: string) =>
            axios.post("/api/like", { postId }).then((res) => res.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast.success(data)
        }
    });
};
