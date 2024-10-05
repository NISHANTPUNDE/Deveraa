import { NextResponse } from "next/server";

export function middleware(request) {
    const authToken = request.cookies.get('authtoken');
    if (!authToken) {
        return NextResponse.redirect(new URL('/', request.url));
    }


    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/write/:path*'],
};
