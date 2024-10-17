import Userpost from '@/models/blogs';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req, { params }) {
    const { post } = params;
    try {
        const result = await Userpost.findOne({
            $or: [{ title: post },
            { slug: post }]
        }).collation({ locale: 'en', strength: 2 });;

        if (!result) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ post: result }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
