import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest){
    const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

    if(!session){
        const requestedPage = req.nextUrl.pathname
        const url = req.nextUrl.clone()
        url.pathname = "/Login"
        url.search = `p=${requestedPage}`

        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}


export const config = {
    matcher: ['/Maintenance/:path*']
};
