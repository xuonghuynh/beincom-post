import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreatePostSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import Editor from "@/components/editor/Editor";
import "@/components/editor/prosemirror.css";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usePostDialog } from "@/stores/usePostDialog";
import { useQuery } from "@tanstack/react-query";

const CreatePostForm = () => {
    const router = useRouter();
    const {setOpen} = usePostDialog();
    const { refetch  } = useQuery({
        queryKey: ["posts"],
    })
    const form = useForm<z.infer<typeof CreatePostSchema>>({
        resolver: zodResolver(CreatePostSchema),
        defaultValues: {
            content: '""',
        },
    });

    async function onSubmit(values: z.infer<typeof CreatePostSchema>) {
        console.log(values);
        try {
            const result = await axios.post(
                "/api/post",
                values
            )
            if (result.status === 200) {
                toast.success("Create post successfully!");
                setOpen(false)
                refetch();
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Editor
                                    initialValue={JSON.parse(field.value)}
                                    onChange={(value) => {
                                        const descriptionOnString =
                                            JSON.stringify(value);
                                        field.onChange(descriptionOnString);
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                This is smart editor. You can use &apos;/&apos; for command
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default CreatePostForm;
