import { auth } from "@/auth";

export const getServerCurrentUser = async () => {
    const session = await auth();
    return session?.user || null;
}