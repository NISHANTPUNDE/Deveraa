import Userpost from '@/models/blogs';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        const user = await Userpost.find({}).sort({ createdAt: -1 });
        const response = NextResponse.json({ user }, { status: 200 });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
