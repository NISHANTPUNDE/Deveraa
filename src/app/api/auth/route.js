import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
// import cors, { runMiddleware } from './cors-middleware';

const SECRET_KEY = 'Srushti$123';

export async function POST(request) {
    // await runMiddleware(request, NextResponse, cors);
    try {
        const body = await request.json();
        const { email, password } = body;

        let user = "nishantpunde@gmail.com";
        let pass = "123456";

        if (user !== email) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        if (pass !== password) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
        }

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

        const response = NextResponse.json({ message: 'Login successful', user }, { status: 200 });

        response.cookies.set({
            name: 'authtoken',
            value: token,
            httpOnly: true,
            withCredentials: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 3,
            path: '/',
        });

        return response;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
    }
}



