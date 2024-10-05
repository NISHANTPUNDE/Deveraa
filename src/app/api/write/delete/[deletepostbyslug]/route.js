import Userpost from '@/models/blogs';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    try {
        const { deletepostbyslug } = params;
        console.log(deletepostbyslug)
        console.log(params)
        const deletepost = await Userpost.deleteOne({ slug: deletepostbyslug });
        return NextResponse.json({ message: "Post deleted successfully", deletepost }, { status: 200 });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}