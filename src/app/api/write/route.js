import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import Userpost from '@/models/blogs';

export async function POST(req) {
    try {
        const data = await req.formData();

        const imgFile = data.get('imgFile');
        const zipFile = data.get('zipFile');
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
            zipFilePath = `./public/uploads/file/${zipFileName}`;
            zipFilePathfordb = `/uploads/file/${zipFileName}`;
            await writeFile(zipFilePath, buffer);
            console.log(`Zip file saved at ${zipFilePath}`);
        }

        const blogData = JSON.parse(data.get('inputfields'));
        const contentBlocks = JSON.parse(data.get('contentBlocks') || '[]');
        console.log('Form Input Data:', blogData);
        console.log('Content Blocks:', contentBlocks);
        console.log("code ", contentBlocks.code);

        if (blogData.contentBlocks && Array.isArray(blogData.contentBlocks)) {
            blogData.contentBlocks.forEach((block) => {
                contentBlocks.push({
                    heading: block.heading,
                    type: block.type,
                    content: block.content,
                    image: imgFilePathfordb,
                    code: block.code
                });
            });
        }
        const date = new Date();
        const newBlog = new Userpost({
            title: blogData.title,
            description: blogData.description,
            slug: blogData.slug,
            date: date.toDateString(),
            contentBlocks: contentBlocks,
            videourl: blogData.videourl,
            tag: blogData.tag,
            image: imgFilePathfordb,
            fileurl: zipFilePathfordb,
            readingtime: blogData.readingtime
        });

        await newBlog.save();
        console.log('Blog post created successfully');

        return NextResponse.json({
            message: 'Blog post created successfully',
            blogData,
            imgFilePath: imgFile ? `/uploads/${path.basename(imgFilePath)}` : null,
            zipFilePath: zipFile ? `/uploads/${path.basename(zipFilePath)}` : null,
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

