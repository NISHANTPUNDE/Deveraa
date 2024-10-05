import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import Userpost from '@/models/blogs';

export async function PUT(req) {
    try {
        const datapost = await req.formData();
        console.log(datapost.get('imgFile'));
        const data = JSON.parse(datapost.get('inputfields'));
        const slug = data.slug;
        const existingPost = await Userpost.findOne({ slug });
        if (!existingPost) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
        const imgFile = datapost.get("imgFile");
        const zipFile = datapost.get("zipFile");
        console.log("files", imgFile, zipFile);
        let imgFilePath, zipFilePath, imgFilePathfordb, zipFilePathfordb;

        if (imgFile) {
            const byteData = await imgFile.arrayBuffer();
            const buffer = Buffer.from(byteData);
            const imgFileName = imgFile.name;
            imgFilePath = `./public/uploads/${imgFileName}`;
            imgFilePathfordb = `/uploads/${imgFileName}`;
            await writeFile(imgFilePath, buffer);
            console.log(`Image file saved at ${imgFilePath}`);
        }

        if (zipFile) {
            const byteData = await zipFile.arrayBuffer();
            const buffer = Buffer.from(byteData);
            const zipFileName = zipFile.name;
            console.log(zipFileName)
            zipFilePath = `./public/uploads/file/${zipFileName}`;
            zipFilePathfordb = `/uploads/file/${zipFileName}`;
            await writeFile(zipFilePath, buffer);
            console.log(`Zip file saved at ${zipFilePath}`);
        }


        const blogData = JSON.parse(datapost.get('inputfields'));
        const contentBlocks = blogData.contentBlocks;

        if (contentBlocks && Array.isArray(contentBlocks)) {
            existingPost.contentBlocks = contentBlocks.map(block => ({
                heading: block.heading,
                type: block.type,
                content: block.content,
                image: imgFilePathfordb || existingPost.image,
                code: block.code
            }));
        }
        const updatedDate = new Date();

        existingPost.title = blogData.title || existingPost.title;
        existingPost.description = blogData.description || existingPost.description;
        existingPost.slug = blogData.slug || existingPost.slug;
        existingPost.date = updatedDate.toDateString();
        existingPost.contentBlocks = contentBlocks.length > 0 ? contentBlocks : existingPost.contentBlocks;
        existingPost.videourl = blogData.videourl || existingPost.videourl;
        existingPost.tag = blogData.tags || existingPost.tag;
        existingPost.image = imgFilePathfordb || existingPost.image;
        existingPost.fileurl = zipFilePathfordb || existingPost.fileurl;
        existingPost.readingtime = blogData.readingtime || existingPost.readingtime;

        await existingPost.save();
        console.log('Blog post updated successfully');

        return NextResponse.json({
            message: 'Blog post updated successfully',
            blogData,
            imgFilePath: imgFile ? `/uploads/${path.basename(imgFilePath)}` : existingPost.image,
            zipFilePath: zipFile ? `/uploads/${path.basename(zipFilePath)}` : existingPost.fileurl,
        }, { status: 200 });

    } catch (error) {
        console.error("Error handling form submission:", error);

        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return NextResponse.json({
                error: `Duplicate entry in field: ${field}. Please use a unique value.`,
            }, { status: 400 });
        }

        if (error.name === 'ValidationError') {
            const fieldErrors = Object.values(error.errors).map(err => err.message);
            console.log('Validation failed error', fieldErrors);
            return NextResponse.json({
                error: 'Validation failed',
                details: fieldErrors
            }, { status: 400 });
        }

        return NextResponse.json({ error: "Failed to handle form submission" }, { status: 500 });
    }
}
