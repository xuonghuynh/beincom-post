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
import AvataAndName from "@/components/AvataAndName";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const NewPostDialog = () => {
    const { open, setOpen } = usePostDialog();
    const user = useCurrentUser();
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Create Post</DialogTitle>
                    <AvataAndName name={user?.name} email={user?.email} image={user?.image} />
                    <div className="!mt-5">
                        <CreatePostForm />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default NewPostDialog;
