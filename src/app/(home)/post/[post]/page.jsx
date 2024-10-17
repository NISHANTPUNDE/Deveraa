import React from "react";
import RightAside from "@/components/RightAside";
import LeftAside from "@/components/LeftAside";
import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import { NEXT_PUBLIC_BASE_URL } from "@/app/lib/Constant";
import { LuClock } from "react-icons/lu";
import IframeTag from "@/components/YoutubeLink";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/post/${params.post}`);
    if (!res.ok) {
      throw new Error("Failed to fetch post metadata");
    }
    const post = await res.json();

    const title = post.post.title || "Default Title";
    const description = post.post.description || "Default Description";
    const image = `${NEXT_PUBLIC_BASE_URL}/_next/static/media/deveraa.31c8d42c.png`;
    console.log(image);

    return {
      title: `${title} | Deveraa`,
      description: description,
      openGraph: {
        title: `${title} | Deveraa`,
        description: description,
        images: [
          {
            url: image,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [image],
      },
    };
  } catch (error) {
    console.error("Error generating metadata: ", error);
    return {
      title: "Error",
      description: "There was an error fetching the metadata.",
    };
  }
}

const BlogDetail = async ({ params }) => {
  let tags;
  async function getPosts() {
    try {
      const res = await fetch(
        `${NEXT_PUBLIC_BASE_URL}/api/post/${params.post}`,
        {
          cache: "no-store",
        }
      );
      if (res.ok) {
        const data = await res.json();
        tags = data.post.tag;
        return data.post;
      }
    } catch (error) {
      return null;
    }
  }

  async function getbyTags() {
    try {
      const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/tags/${tags}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const datapost = await getPosts();
  const gettagpost = await getbyTags();

  if (!datapost) {
    redirect("/not-found");
  }

  const slugsArrayrev = gettagpost?.blogs.map((item) => item.slug);
  const slugsArray = slugsArrayrev.reverse();

  const currentSlugIndex = slugsArray.findIndex(
    (slug) => slug === datapost.slug
  );

  const prevSlug =
    currentSlugIndex > 0 ? slugsArray[currentSlugIndex - 1] : null;
  const nextSlug =
    currentSlugIndex < slugsArray.length - 1
      ? slugsArray[currentSlugIndex + 1]
      : null;

  console.log("Previous:", prevSlug, "Next:", nextSlug);
  const tagspost = gettagpost.blogs.filter(
    (item) => datapost.title !== item.title
  );

  return (
    <div className="min-h-screen bg-gray-100 mt-[80px]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:p-4">
        <LeftAside
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          data-ad-slot="4816179228"
        />

        <main className="bg-white p-4 md:col-span-2 shadow-md rounded-2xl">
          <article>
            <div className="min-h-screen bg-white">
              <div className="flex float-right">
                {prevSlug && (
                  <Link
                    href={`/post/${prevSlug}`} // Navigate to the previous post using the slug
                    className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-white bg-blue-600 border border-gray-300 rounded-lg hover:bg-blue-900 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                      />
                    </svg>
                    Previous
                  </Link>
                )}

                {nextSlug && (
                  <Link
                    href={`/post/${nextSlug}`} // Navigate to the next post using the slug
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-600 border border-gray-300 rounded-lg hover:bg-blue-900 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                )}
              </div>

              <header className="py-8 ">
                <h3 className="text-2xl font-bold font-serif">
                  {datapost?.title}
                </h3>

                <p className="text-m font-serif text-gray-700 text-wrap ">
                  {datapost?.description}
                </p>

                <div className="flex items-center mt-4 space-x-3 ">
                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                    <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-lg ">
                      📅 {datapost?.date}
                    </span>
                    <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-lg md:ml-4">
                      ⏱ {datapost?.readingtime}
                    </span>
                  </div>
                </div>
              </header>
              <section>
                {datapost?.contentBlocks?.map((item) => {
                  if (item.type === "content") {
                    return (
                      <>
                        <h1 className="text-xl font-bold font-serif">
                          {item?.heading}
                        </h1>

                        <p className=" text-m font-serif text-gray-700">
                          <pre className="text-m font-serif text-gray-700 text-wrap">
                            {item?.content}
                          </pre>
                        </p>
                      </>
                    );
                  }
                  if (item.type === "code") {
                    return (
                      <>
                        <code className="block my-2 py-4  rounded-lg">
                          <pre
                            className="py-5 mt-4 text-s font-serif border-l-4 pl-4 text-gray-700 bg-gray-100 shadow-lg rounded-lg overflow-auto max-h-[70vh]"
                            style={{ borderColor: "#007FFF" }}
                          >
                            {item?.code}
                          </pre>
                        </code>
                      </>
                    );
                  }
                  if (item.type === "image") {
                    return (
                      <div className="w-full max-w-4xl h-[400px] rounded-lg py-2 mb-2">
                        <ContentImage
                          key={item.id}
                          src={datapost.image}
                          alt="image"
                          className="w-full h-auto max-w-2xl mx-auto rounded-lg shadow-lg object-cover"
                        />
                      </div>
                    );
                  }
                })}
              </section>

              {datapost?.videourl && (
                <section className="py-4">
                  <iframe
                    src={datapost?.videourl}
                    className="w-full h-96"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </section>
              )}
              {datapost?.fileurl && (
                <section className="my-4">
                  <a
                    className="w-3/12 flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-600 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    href={datapost.fileurl}
                    target="_blank"
                  >
                    Download File
                  </a>
                </section>
              )}
            </div>
            {/* ///////////////////////// */}
            {/* ////////////////////////// */}
            {/* //////////////////////// */}
            <div>
              {tagspost.length > 0 && (
                <div className="mt-8">
                  <h1 className="text-2xl mb-4 font-bold text-gray-800 font-serif">
                    Related Posts
                  </h1>
                  {tagspost?.map((item) => (
                    <Link href={`/post/${item?.slug}`} key={item?.id}>
                      <div
                        key={item.id}
                        className="my-4 p-4 border border-gray-300 rounded-lg transition-shadow shadow-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex space-x-2 mb-2">
                              <span className="text-sm text-blue-600 font-medium font-roboto">
                                {item?.category}
                              </span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 line-clamp-1 font-roboto">
                              {item.title}
                            </h2>
                            <div className="mt-1">
                              <h3 className="text-lg text-gray-600 line-clamp-3 leading-relaxed font-roboto">
                                {item?.description}
                              </h3>
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-gray-500">
                              <LuClock color="gray" />
                              <span className="text-sm font-roboto">
                                {item?.readingtime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </article>
        </main>
        <div className="hidden md:block">
          <RightAside />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
