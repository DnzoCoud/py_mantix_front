import { IRole } from "@/interfaces/IRole"
import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth"{
    interface Session {
        user: {
            id:string
            first_name:string|null
            last_name:string|null
            is_director:boolean
            is_manager:boolean
            token:string
            username:string|null
            role_detail: IRole
            jwt:JWT

        } & DefaultSession["user"]
    } 
}