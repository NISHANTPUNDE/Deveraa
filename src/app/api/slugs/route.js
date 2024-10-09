import Userpost from '@/models/blogs'; // Adjust the path if necessary
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        const slugs = await Userpost.distinct('slug');

        return NextResponse.json({ slugs }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Error fetching slug", err }, { status: 500 });
    }
}
