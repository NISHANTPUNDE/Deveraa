import LeftAside from "@/components/LeftAside";
import RightAside from "@/components/RightAside";
import { GiFlatStar } from "react-icons/gi";
import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import { getPosts } from "./data/apiPosts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const datapost = await getPosts();


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-6">
        <LeftAside
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          data-ad-slot="8078667197"
        />

        <main className="bg-white p-6 md:col-span-2 shadow-lg rounded-lg">
          <article>
            <h1 className="text-4xl font-extrabold mb-6 text-gray-700">Blog Posts</h1>
            <div>
              {datapost?.user.length > 0 ? (
                datapost.user.map((item) => (
                  <Link href={`/post/${item.slug}`} key={item.id}>
                    <div
                      key={item.id}
                      className="mb-12 pb-6 border-b-2 border-sky-400 hover:shadow-lg transition-shadow duration-300 rounded-lg pl-2"
                    >
                      <div className="flex items-center justify-between gap-6">
                        <div className="w-2/3">
                          <h2 className="text-2xl capitalize font-semibold text-gray-700 hover:text-sky-500 transition-colors duration-200">
                            {item.title}
                          </h2>
                          <h3 className="text-md capitalize line-clamp-3 text-gray-600 mt-2 leading-relaxed">
                            {item.description}
                          </h3>
                          <div className="flex gap-2 items-center mt-3">
                            <GiFlatStar color="yellow" className="text-xl" />
                            <span className="text-sm text-gray-500">{item.readingtime}</span>
                          </div>
                        </div>
                        <div className="w-1/3 flex-shrink-0">
                          <ContentImage
                            src={item.image}
                            alt={item.title}
                            className="object-cover w-full h-36 rounded-lg shadow-md"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-500">No posts available</p>
              )}
            </div>
          </article>
        </main>
        <RightAside />
      </div>
    </div>
  );
}
