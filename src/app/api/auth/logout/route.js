import { NextResponse } from 'next/server';

export async function POST(request) {
    const response = NextResponse.json({ message: 'Logout successful' });
    response.cookies.set('auth-token', '', { maxAge: -1 });

    return response;
}
