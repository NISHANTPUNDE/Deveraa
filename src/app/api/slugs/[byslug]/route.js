import { NextResponse } from "next/server";
import Userpost from "@/models/blogs";

export async function GET(req, { params }) {
    try {
        const { byslug } = params;
        console.log(byslug)
        const slugs = await Userpost.find({ slug: byslug });
        return NextResponse.json({ slugs }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Error fetching byslug", err }, { status: 500 });
    }
}


