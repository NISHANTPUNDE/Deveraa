import Userpost from '@/models/blogs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const user = await Userpost.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
