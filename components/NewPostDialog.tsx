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

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const NewPostDialog = ({ open, setOpen }: Props) => {
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
