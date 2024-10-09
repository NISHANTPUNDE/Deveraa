import { NEXT_PUBLIC_BASE_URL } from "@/app/lib/Constant";
export async function getPosts() {
    try {
        const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/post`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        return { user: [] };
    }
}