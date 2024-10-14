import Userpost from "@/models/blogs";
import { NEXT_PUBLIC_BASE_URL } from '@/lib/Constant';

export default async function sitemap() {
    const data = await Userpost.find({});
    const post = data.map((post) => ({
        url: `${NEXT_PUBLIC_BASE_URL}/blogs/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'daily',
        priority: 0.8
    }))
    return [
        {
            url: `${NEXT_PUBLIC_BASE_URL}/`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${NEXT_PUBLIC_BASE_URL}/post`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${NEXT_PUBLIC_BASE_URL}/tags`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        ...post
    ]


}

