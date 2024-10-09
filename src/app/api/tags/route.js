import Userpost from '@/models/blogs'; // Adjust the path if necessary
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        const tags = await Userpost.distinct('tag');

        return NextResponse.json({ tags }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Error fetching tags", err }, { status: 500 });
    }
}
