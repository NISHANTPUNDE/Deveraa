"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import AdminSidePanel from "@/components/AdminSidePanel";
import { CloudCogIcon } from "lucide-react";
import Image from "next/image";
import { NEXT_PUBLIC_BASE_URL } from "@/app/lib/Constant";

const EditBlog = () => {
  const [imgFile, setImgFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [datapost, setDatapost] = useState({
    title: "",
    description: "",
    contentBlocks: [],
    tag: "",
    slug: "",
    videourl: "",
    readingtime: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  async function getPosts() {
    try {
      console.log(searchTerm);
      const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/post/${searchTerm}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }
      const data = await res.json();
      setDatapost(data.post || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  console.log("datapost", datapost);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatapost({ ...datapost, [name]: value });
  };

  const handleContentBlockChange = (e, index) => {
    const { name, value } = e.target;
    const updatedBlocks = [...datapost.contentBlocks];
    updatedBlocks[index] = { ...updatedBlocks[index], [name]: value };
    setDatapost({ ...datapost, contentBlocks: updatedBlocks });
  };
  console.log(zipFile);
  console.log(imgFile);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (imgFile) data.append("imgFile", imgFile);
    if (zipFile) data.append("zipFile", zipFile);
    data.append("inputfields", JSON.stringify(datapost));
    data.append("contentBlocks", JSON.stringify(datapost.contentBlocks));
    console.log(data);

    const result = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/write/edit`, {
      method: "PUT",
      body: data,
    });

    if (result.ok) {
      alert("Blog post submitted successfully.");
    } else {
      const errorData = await result.json();
      alert(`Failed to submit blog post: ${errorData.message}`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 md:flex md:flex-row flex-col justify-start md:py-8 py-2 ">
        <AdminSidePanel />
        <main className="bg-white p-6 shadow-md w-full max-w-3xl rounded-lg">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by title or slug"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              className="w-48 h-10 px-6 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
              onClick={getPosts}
            >
              Search
            </button>
          </div>
          <div className="block w-full border border-b-indigo-900 mb-4"></div>
          <form onSubmit={handleSubmit}>
            <div className="p-2 border border-gray-800 rounded-md mb-2">
              <span className="my-2">Title</span>
              <textarea
                placeholder="Title"
                name="title"
                value={datapost?.title}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
                // required
              ></textarea>
            </div>
            <div className="p-2 border border-gray-800 rounded-md mb-2">
              <span className="my-2">Description</span>
              <textarea
                placeholder="Description"
                name="description"
                value={datapost?.description}
                onChange={handleChange}
                rows={2}
                className="peer h-24 w-full resize-none bg-transparent pt-4 font-sans font-normal text-blue-gray-700 outline-none transition-all placeholder:text-gray-500 text-lg pl-2 mb-4 border border-gray-300 rounded-md focus:border-gray-900"
                required
              ></textarea>
            </div>

            {datapost?.contentBlocks?.map((item, index) => {
              if (item.type === "content") {
                return (
                  <>
                    <div className="p-2 border border-gray-800 rounded-md mb-2">
                      <span className="my-2">Content block</span>
                      <input
                        type="text"
                        placeholder="Content Heading"
                        name="heading"
                        value={item?.heading}
                        onChange={(e) => handleContentBlockChange(e, index)}
                        className="mb-2 pl-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
                      />
                      <textarea
                        placeholder="Content"
                        name="content"
                        value={item?.content}
                        onChange={(e) => handleContentBlockChange(e, index)}
                        rows={4}
                        className="peer w-full resize-none bg-transparent pt-4 font-sans font-normal text-blue-gray-700 outline-none transition-all placeholder:text-gray-500 text-lg pl-2 mb-4 border border-gray-300 rounded-md focus:border-gray-900"
                      ></textarea>
                    </div>
                  </>
                );
              }
              if (item.type === "code") {
                return (
                  <>
                    <div className="p-2 border border-gray-800 rounded-md mb-2">
                      <span className="my-2">Code block</span>
                      <textarea
                        placeholder="Code"
                        name="code"
                        value={item?.code}
                        onChange={(e) => handleContentBlockChange(e, index)}
                        rows={6}
                        className="peer w-full resize-none bg-transparent pt-4 font-sans font-normal text-blue-gray-700 outline-none transition-all placeholder:text-gray-500 text-lg pl-2 mb-4 border border-gray-300 rounded-md focus:border-gray-900"
                      ></textarea>
                    </div>
                  </>
                );
              }
              if (item.type === "image") {
                return (
                  <>
                    <div className="p-2 border border-gray-800 rounded-md mb-2">
                      <span className="my-2">Image block</span>
                      <Image
                        src={
                          `${datapost?.image}` ||
                          "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                        }
                        alt="image"
                        className="w-24 h-24 mb-2"
                        width={400}
                        height={300}
                      />
                      <input
                        className="block w-full text-lg text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none mb-4 rounded-md"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        name="image"
                        onChange={(e) => setImgFile(e?.target?.files[0])}
                      />
                    </div>
                  </>
                );
              }
            })}
            <div className="p-2 border border-gray-800 rounded-md mb-2">
              <span className="my-2">Tags here</span>
              <input
                name="tag"
                type="text"
                placeholder="Tags"
                className="mb-4 pl-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
                onChange={handleChange}
                required
                value={datapost?.tag}
              />
            </div>
            <div className="p-2 border border-gray-800 rounded-md mb-2">
              <span className="my-2">Slug or Url</span>
              <input
                name="slug"
                type="text"
                placeholder="slug or url"
                className="mb-4 pl-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
                onChange={handleChange}
                required
                value={datapost?.slug}
              />
            </div>
            <div className="p-2 border border-gray-800 rounded-md mb-2">
              <span className="my-2">Video Embedded Link</span>
              <input
                name="videourl"
                type="url"
                placeholder="video link"
                className="mb-4 pl-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
                onChange={handleChange}
                value={datapost?.videourl}
              />
            </div>
            {/* //////////////////// */}
            <div className="p-2 border border-gray-800 rounded-md mb-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="file_name"
              >
                Filename
              </label>
              <input
                name="file"
                id="file_name"
                type="text"
                placeholder="filename"
                className="mb-4 pl-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
                value={
                  datapost?.fileurl?.replace("/uploads/file/", "") ||
                  "file not uploaded"
                }
                readOnly
              />
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-lg text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none mb-4 rounded-md"
                id="file_input"
                name="fileurl"
                type="file"
                onChange={(e) => setZipFile(e.target.files[0])}
              />
            </div>
            <div className="p-2 border border-gray-800 rounded-md mb-2">
              <span className="my-2">Reading Time</span>
              <input
                className="mb-2 pl-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
                id="readingtime"
                type="text"
                name="readingtime"
                placeholder="reading time"
                onChange={handleChange}
                value={datapost?.readingtime}
              />
            </div>
            {/* /////////////// */}

            <button
              className="w-full h-12 px-6 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
              type="submit"
            >
              Submit
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default EditBlog;
