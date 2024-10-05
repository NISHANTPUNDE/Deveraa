import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'Srushti$123';
export async function POST(request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Unauthorized, token missing' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, SECRET_KEY);

        return NextResponse.json({ message: 'Token is valid', user: decoded }, { status: 200 });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }

        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
    }
}
