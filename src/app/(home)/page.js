import { GiFlatStar } from "react-icons/gi";
import Link from "next/link";
import { getPosts } from "@/app/data/apiPosts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const datapost = await getPosts();

  return (
    <>
      <div className="container mx-auto md:w-[80%] mt-[100px] p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {datapost?.user.map((item) => (
            <Link href={`/post/${item.slug}`} passHref>
              <div key={item.id} className="w-auto bg-white shadow-lg rounded overflow-hidden">
                <div className="relative bg-gray-800 overflow-hidden h-72">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 hover:bg-[length:175%]"
                    style={{
                      backgroundImage: `url("https://blog.deveraa.com${item.image}")`,
                      backgroundSize: "150%",
                    }}
                  ></div>
                  <div className="relative z-10 flex flex-col justify-between p-6 text-white h-full">
                    <div className="w-fit bg-gradient-to-r from-blue-500 to-blue-700 text-white font-serif text-xl px-4 py-2 rounded-full shadow-lg inline-block invisible">
                      <span className="text-md text-gray-500">{item.date}</span>
                    </div>

                    {/* <div className="w-fit bg-gradient-to-r from-blue-500 to-blue-700 text-white font-serif text-xl px-4 py-2 rounded-full shadow-lg inline-block ">
                      <h1 className="text-white">{item.title}</h1>
                    </div> */}


                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between h-[189px]">
                  <p className="text-gray-800 font-medium leading-6 mb-2">

                    <span className="text-md text-gray-500">{item.date}</span>
                    <strong className="h- line-clamp-2 font-semibold">{item.title}</strong>
                  </p>
                  <div className="flex gap-2 items-center mb-2">
                    <GiFlatStar color="yellow" />
                    <span className="text-md text-gray-500">{item.readingtime}</span>

                  </div>
                  <div>
                    <Link href={`/post/${item.slug}`} passHref>
                      <span className="uppercase font-bold text-xs text-blue-600 hover:text-blue-800">
                        Read Article
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div >
    </>
  );
}
