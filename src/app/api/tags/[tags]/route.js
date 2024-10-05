import { NextResponse } from "next/server";
import Userpost from "@/models/blogs";

export async function GET(req, { params }) {
    try {
        const { tags } = params;
        console.log(tags)
        const blogs = await Userpost.find({ tag: tags });
        return NextResponse.json({ blogs }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Error fetching blogs", err }, { status: 500 });
    }
}


