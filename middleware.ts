import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { DEFAULT_USER_LOGIN_REDIRECT, publicRoutes, authRoutes, apiAuthPrefix } from "@/routes"
import { NextResponse } from "next/server"

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)   

    console.log(nextUrl.pathname, isPublicRoute)

    if(isApiAuthRoute) {
        return 
    }

    if(isAuthRoute) {
        if(isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_USER_LOGIN_REDIRECT, nextUrl))
        }
        return 
    }

    if(!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", nextUrl))
    }
    return 
})

export const config = { matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"] }