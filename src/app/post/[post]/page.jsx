import React from "react";
import RightAside from "@/components/RightAside";
import LeftAside from "@/components/LeftAside";
import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import { NEXT_PUBLIC_BASE_URL } from "@/app/lib/Constant";
import { LuClock } from "react-icons/lu";

const BlogDetail = async ({ params }) => {
  let tags;
  async function getPosts() {
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/post/${params.post}`);
    const data = await res.json();
    tags = data.post.tag;
    return data.post;
  }

  async function getbyTags() {
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/tags/${tags}`);
    const data = await res.json();
    return data;
  }

  const datapost = await getPosts();
  const gettagpost = await getbyTags();

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
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <LeftAside
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          data-ad-slot="4816179228"
        />

        <main className="bg-white p-4 md:col-span-2 shadow-md">
          <article>
            <div className="min-h-screen bg-white">
              <div className="flex float-right">
                {prevSlug && (
                  <Link
                    href={`/post/${prevSlug}`} // Navigate to the previous post using the slug
                    className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                <h1 className="text-4xl font-bold">{datapost.title}</h1>
                <p className="mt-2 text-lg border-l-4 border-gray-500 pl-2 text-gray-500">
                  {datapost?.description}
                </p>
                <div className=" items-center mt-4 space-x-3">
                  <div className="flex-col">
                    <span className="text-sm text-gray-500">
                      {datapost.date}
                    </span>
                    <span className="text-sm text-gray-500 ml-4">
                      {datapost?.readingtime}
                    </span>
                  </div>
                </div>
              </header>
              <section>
                {datapost?.contentBlocks?.map((item) => {
                  if (item.type === "content") {
                    return (
                      <>
                        <h1 className="text-3xl font-bold mb-4">
                          {item?.heading}
                        </h1>
                        <p className="text-lg mb-4">
                          <pre className="text-lg text-wrap font-sans">
                            {item?.content}
                          </pre>
                        </p>
                      </>
                    );
                  }
                  if (item.type === "code") {
                    return (
                      <>
                        <code className="block my-2  bg-gray-100 p-4 rounded-lg">
                          <pre className="overflow-auto max-h-[70vh]">
                            {item?.code}
                          </pre>
                        </code>
                      </>
                    );
                  }
                  if (item.type === "image") {
                    return (
                      <ContentImage
                        key={item.id}
                        src={datapost.image}
                        alt="image"
                      />
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
                    className="border rounded-md bg-slate-600 p-4 font-semibold text-white text-xl"
                    href={datapost.fileurl}
                    target="_blank"
                  >
                    Download File {datapost.fileurl.slice(14)}
                  </a>
                </section>
              )}
            </div>
            {/* ///////////////////////// */}
            {/* ////////////////////////// */}
            {/* //////////////////////// */}
            <div>
              <div className="mt-8">
                <h1 className="text-3xl mb-2 font-bold">Related Posts</h1>
                {tagspost?.map((item) => (
                  <Link href={`/post/${item?.slug}`} key={item?.id}>
                    <div
                      key={item.id}
                      className="my-4 p-2 border bottom-1 border-gray-400 rounded-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex space-x-2">
                            <span className="text-sm text-black"></span>
                          </div>
                          <h2 className="text-xl font-bold line line-clamp-1">
                            {item.title}
                          </h2>
                          <div>
                            <h3 className=" text-lg text-gray-500 line-clamp-3 leadind-2">
                              {item?.description}
                            </h3>
                          </div>
                          <div>
                            <div className="flex gap-2 items-center">
                              <LuClock color="grey" />
                              <span className="text-md text-gray-600">
                                {item?.readingtime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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
