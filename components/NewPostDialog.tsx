import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CreatePostForm from "@/components/CreatePostForm";
import { usePostDialog } from "@/stores/usePostDialog";

const NewPostDialog = () => {
    const { open, setOpen } = usePostDialog();
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Creating Post</DialogTitle>
                    <div className="!mt-5">
                        <CreatePostForm />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default NewPostDialog;
