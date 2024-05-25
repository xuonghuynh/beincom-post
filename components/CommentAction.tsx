import AvataAndName from "@/components/AvataAndName";
import { PostChildProps } from "@/types/types";
import { Textarea } from "@/components/ui/textarea";

import React, { useEffect } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { AutosizeTextarea } from "@/components/ui/textarea-autosize";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useComment } from "@/hooks/useComment";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCommentSchema } from "@/schemas";

const CommentAction = ({ post }: PostChildProps) => {
    const [active, setActive] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const user = useCurrentUser();
    const form = useForm<z.infer<typeof CreateCommentSchema>>({
        resolver: zodResolver(CreateCommentSchema),
        defaultValues: {
            comment: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const { mutate: mutateComment, isSuccess } = useComment(post.id);

    const submitForm = () => {
        form.handleSubmit(onSubmit)();
    };

    function onSubmit(values: z.infer<typeof CreateCommentSchema>) {
        const data = {
            postId: post.id,
            content: values.comment,
        };
        mutateComment(data);
    }

    useEffect(() => {
        if (isSuccess) {
            setComment("");
        }
    }, [isSuccess]);
    return (
        <div className="flex items-start py-4 pb-0">
            <AvataAndName image={user?.image} name={user?.name} hideName />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-2 border rounded-md"
                >
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl className="w-full rounded-md p-1">
                                    <div>
                                        <AutosizeTextarea
                                            className="focus-visible:ring-0 rounded-none border-none resize-none"
                                            placeholder={`Comment as ${user?.name}`}
                                            disabled={isSubmitting}
                                            onChange={(e) => {
                                                setComment(e.target.value);
                                                field.onChange(e.target.value);
                                            }}
                                            onFocus={(e) => setActive(true)}
                                            value={comment}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    submitForm();
                                                }
                                            }}
                                        />
                                        <div
                                            className={cn(
                                                "flex items-center justify-between transition-all border-t pl-[13px]",
                                                { hidden: !active }
                                            )}
                                        >
                                            <div className="text-xs text-muted-foreground">
                                                Press Enter to comment.
                                            </div>
                                            <Button
                                                disabled={
                                                    isSubmitting || !isValid
                                                }
                                                className="hover:bg-transparent"
                                                variant={"ghost"}
                                                type="submit"
                                            >
                                                <SendHorizonal className="h-4 w-4 hover:text-purple-500" />
                                            </Button>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-xs !mt-0 px-4 pb-4" />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

export default CommentAction;
