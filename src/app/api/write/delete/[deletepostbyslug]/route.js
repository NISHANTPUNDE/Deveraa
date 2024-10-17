import Userpost from '@/models/blogs';
import { NextResponse } from 'next/server';
import fs from 'fs';
export const dynamic = 'force-dynamic';
export async function DELETE(req, { params }) {
    try {
        const { deletequery } = params;
        console.log(deletequery)
        console.log(params)
        const post = await Userpost.findOne({
            $or: [{ title: { $regex: new RegExp(deletequery, 'i') } },
            { slug: { $regex: new RegExp(deletequery, 'i') } }]
        });
        console.log(post)
        const deletepost = await Userpost.deleteOne({ _id: post._id });
        try {
            fs.unlinkSync(`./public/${post.image}`);
            fs.unlinkSync(`./public/${post.fileurl}`);
        }
        catch (err) {
            console.log(err);
        }

        return NextResponse.json({ message: "Post deleted successfully", deletepost }, { status: 200 });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}