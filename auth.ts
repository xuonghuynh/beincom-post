import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { UserRole } from "@prisma/client";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/actions/auth/get-user-by-id";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id: string;
            // role: UserRole;
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"];
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
        error: "/login-error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow signing in with provider is not credentials. Example: Google or Github
            if(account?.provider !== "credentials") return true
            // Prevent signing in with credentials if email is not verified
            if(user.id) {
                const existingUser = await getUserById(user.id);
                if(!existingUser?.emailVerified) return false
            }
            
            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            // if (token.role && session.user) {
            //     session.user.role = token.role as UserRole;
            // }

            return session;
        },
        async jwt({ token, user }) {
            if (!token.sub) return token;
            const isExistingUser = await getUserById(token.sub);
            if (!isExistingUser) {
                return token;
            }

            // token.role = isExistingUser.role;
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
