import RightAside from "@/components/RightAside";
import LeftAside from "@/components/LeftAside";
import Link from "next/link";
import Image from "next/image";
import { GiFlatStar } from "react-icons/gi";
import { NEXT_PUBLIC_BASE_URL } from "@/app/lib/Constant";

const Tags = async ({ params }) => {
  console.log(params.tags);
  async function getPosts() {
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/tags/${params.tags}`);
    const data = await res.json();
    return data.blogs;
  }
  const datapost = await getPosts();
  console.log(datapost);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <LeftAside
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          data-ad-slot="5151259131"
        />

        <main className="bg-white p-4 md:col-span-2 shadow-md">
          <article>
            <h1 className="text-4xl font-bold mb-4">Posts By Tags</h1>
            <div>
              {datapost.map((item) => (
                <Link href={`/post/${item.slug}`} key={item.id}>
                  <div
                    key={item.id}
                    className="mb-12 pb-2 border-b-4 border-sky-500"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex space-x-2"></div>
                        <h2 className="text-xl font-bold">{item.title}</h2>
                        <div>
                          <h3 className=" text-lg text-gray-500 ">
                            {item.description}
                          </h3>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <GiFlatStar color="yellow" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Image
                          src={item.image}
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
};

export default Tags;
