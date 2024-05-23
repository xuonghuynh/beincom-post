import NewPostDialog from "@/components/NewPostDialog";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePostDialog } from "@/stores/usePostDialog";
import { ChevronRight } from "lucide-react";
import React from "react";

const NewPostButton = () => {
    const { setOpen } = usePostDialog();
    return (
        <div>
            <Button
                className="z-10 flex items-center justify-center hover:bg-transparent"
                variant={"ghost"}
                onClick={() => setOpen(true)}
            >
                <AnimatedGradientText>
                    ❤️‍🔥 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
                    <span
                        className={cn(
                            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                        )}
                    >
                        Create New Post
                    </span>
                    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
            </Button>
            <NewPostDialog />
        </div>
    );
};

export default NewPostButton;
