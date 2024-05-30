import { authLogin } from "@/services/auth/authService";
import { useAuthStore } from "@/stores/auth/authStore";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            try {
                const auth = await authLogin(credentials?.email, credentials?.password)
                if(!auth?.token) throw new Error("Invalid credentials");

                return {
                    id:   auth.user?.id.toString(), // Convertimos id a string si es necesario
                    username:   auth.user?.username,
                    email:   auth.user?.email,
                    token:  auth.token,
                    role_detail:   auth.user?.role_detail,
                    first_name: auth.user?.first_name,
                    last_name: auth.user?.last_name,
                    is_director: auth.user?.is_director,
                    is_manager: auth.user?.is_manager,

                };
            } catch (error) {
                console.error("Authorize error:", error);
                throw new Error("Invalid credentials");
            }
          }
        })
    ],
    callbacks: {
      async jwt({token, user}) {
        return {...token, ...user}
      },
      async session({session, token}){
        session.user = token as any
        return session
      }
    }
})

export { handler as GET, handler as POST}