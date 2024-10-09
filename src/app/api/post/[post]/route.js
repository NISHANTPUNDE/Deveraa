import Userpost from '@/models/blogs';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req, { params }) {
    console.log(params);
    const { post } = params;
    console.log(post);

    try {
        const result = await Userpost.findOne({ slug: post });

        if (!result) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ post: result }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
