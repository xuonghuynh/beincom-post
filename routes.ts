/** 
* An array of routes that can be accessed without authentication
*/

export const publicRoutes = [
    "/verify-email",
]

/**
* An array of routes that use for authentication
*/

export const authRoutes = [
    "/login",
    "/register",
    "/login-error",
    "/forgot-password",
    "/new-password",
]

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_USER_LOGIN_REDIRECT = "/"