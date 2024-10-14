import Userpost from '@/models/blogs';
import { NextResponse } from 'next/server';
import fs from 'fs';
export async function DELETE(req, { params }) {
    try {
        const { deletepostbyslug } = params;
        console.log(deletepostbyslug)
        console.log(params)
        const post = await Userpost.findOne({ slug: deletepostbyslug });
        console.log(post)
        const deletepost = await Userpost.deleteOne({ slug: deletepostbyslug });
        fs.unlinkSync(`./public/${post.image}`);

        return NextResponse.json({ message: "Post deleted successfully", deletepost }, { status: 200 });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}