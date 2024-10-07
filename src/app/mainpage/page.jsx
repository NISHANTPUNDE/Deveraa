import Image from "next/image";
import LeftAside from "@/components/LeftAside";
import RightAside from "@/components/RightAside";
import { GiFlatStar } from "react-icons/gi";
import Link from "next/link";
import { NEXT_PUBLIC_BASE_URL } from "@/app/lib/Constant";

export default async function MainPage() {
  async function getPosts() {
    try {
      const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/post`);

      if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.statusText}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return { user: [] };
    }
  }
  const datapost = await getPosts();
  console.log(datapost);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <LeftAside
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          data-ad-slot="8078667197"
        />

        <main className="bg-white p-4 md:col-span-2 shadow-md">
          <article>
            <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
            <div>
              {datapost?.user.map((item) => (
                <Link href={`/post/${item?.slug}`} key={item?.id}>
                  <div
                    key={item.id}
                    className="mb-12 pb-2 border-b-4 border-sky-500"
                  >
                    <div className="flex items-center justify-between">
                      <div className="max-w-[500px]">
                        <h2 className="text-xl capitalize font-bold">
                          {item.title}
                        </h2>
                        <div>
                          <h3 className="text-lg capitalize text-gray-500">
                            {item.description}
                          </h3>
                        </div>
                        <div className="flex gap-2 items-center">
                          <GiFlatStar color="yellow" />
                          {/* <span className='text-md text-gray-500'>{item?.date}</span> */}
                          <span className="text-sm text-gray-500 ">
                            {item?.readingtime}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Image
                          src={`${item.image}`}
                          alt={item.title}
                          width={200}
                          height={200}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </article>
        </main>
        <RightAside />
      </div>
    </div>
  );
}
