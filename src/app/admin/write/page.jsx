"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import AdminSidePanel from "@/components/AdminSidePanel";
import { NEXT_PUBLIC_BASE_URL } from "@/app/lib/Constant";

const WriteBlog = () => {
  const { toast } = useToast();
  const [state, setState] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [contentBlocks, setContentBlocks] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleImgFileChange = (e) => {
    setImgFile(e.target.files?.[0]);
  };

  const handleZipFileChange = (e) => {
    setZipFile(e.target.files?.[0]);
  };

  const handleAddContentBlock = (type) => {
    const newBlock = { heading: "", type, content: "", code: "", image: null };
    setContentBlocks([...contentBlocks, newBlock]);
    setDropdownOpen(null);
  };

  const handleContentChange = (e, index) => {
    const { name, value } = e.target;
    const updatedBlocks = [...contentBlocks];
    updatedBlocks[index][name] = value;
    setContentBlocks(updatedBlocks);
  };
  console.log(contentBlocks);
  console.log(state);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (imgFile) data.append("imgFile", imgFile);
    if (zipFile) data.append("zipFile", zipFile);
    data.append("inputfields", JSON.stringify(state));
    data.append("contentBlocks", JSON.stringify(contentBlocks));

    const result = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/write`, {
      method: "POST",
      body: data,
    });

    if (result.ok) {
      toast({
        description: "Your blog post has been created.",
      });
    } else {
      const errorData = await result.json();
      toast({
        variant: "destructive",
        title: errorData.error || "Error",
        description: errorData.details || "Failed to submit the blog post.",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 md:flex md:flex-row flex-col justify-start md:py-8 py-2 ">
        <AdminSidePanel />
        <main className="bg-white p-6 shadow-md w-full max-w-3xl rounded-lg">
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Title"
              name="title"
              onChange={handleChange}
              className="peer h-12 w-full resize-none bg-transparent pt-2 font-sans font-normal text-blue-gray-700 outline-none transition-all placeholder:text-gray-500 text-2xl pl-2 mb-4 border-b-2 border-gray-300 focus:border-gray-900"
              required
            ></textarea>
            <textarea
              placeholder="Description"
              name="description"
              onChange={handleChange}
              rows={2}
              className="peer h-24 w-full resize-none bg-transparent pt-4 font-sans font-normal text-blue-gray-700 outline-none transition-all placeholder:text-gray-500 text-lg pl-2 mb-4 border border-gray-300 rounded-md focus:border-gray-900"
              required
            ></textarea>

            {contentBlocks.map((block, index) => (
              <div key={index} className="mb-6">
                {block.type === "content" && (
                  <>
                    <input
                      type="text"
                      placeholder="Content Heading"
                      name="heading"
                      value={block.heading}
                      onChange={(e) => handleContentChange(e, index)}
                      className="mb-2 pl-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
                    />
                    <textarea
                      placeholder="Content"
                      name="content"
                      value={block.content}
                      onChange={(e) => handleContentChange(e, index)}
                      rows={4}
                      className="peer w-full resize-none bg-transparent pt-4 font-sans font-normal text-blue-gray-700 outline-none transition-all placeholder:text-gray-500 text-lg pl-2 mb-4 border border-gray-300 rounded-md focus:border-gray-900"
                    ></textarea>
                  </>
                )}

                {block.type === "code" && (
                  <textarea
                    placeholder="Code"
                    name="code"
                    value={block.code}
                    onChange={(e) => handleContentChange(e, index)}
                    rows={3}
                    className="peer w-full resize-none bg-transparent pt-4 font-sans font-normal text-blue-gray-700 outline-none transition-all placeholder:text-gray-500 text-lg pl-2 mb-4 border border-gray-300 rounded-md focus:border-gray-900"
                  ></textarea>
                )}

                {block.type === "image" && (
                  <input
                    className="block w-full text-lg text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none mb-4 rounded-md"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    onChange={(e) => handleImgFileChange(e, index)}
                    required
                  />
                )}

                <button
                  type="button"
                  className="text-red-500 mb-4"
                  onClick={() =>
                    setContentBlocks(
                      contentBlocks.filter((_, idx) => idx !== index)
                    )
                  }
                >
                  Remove Block
                </button>
              </div>
            ))}

            <div className="relative float-right">
              <button
                type="button"
                className=" h-12 px-4 text-xl text-zinc-100 rounded-3xl bg-zinc-900 transition-colors duration-150  focus:shadow-outline mb-4"
                onClick={() =>
                  setDropdownOpen(dropdownOpen === null ? true : null)
                }
              >
                +
              </button>

              {dropdownOpen && (
                <div className="absolute flex bg-zinc-50 border border-zinc-300 rounded-lg shadow-lg p-4">
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleAddContentBlock("content")}
                  >
                    Add Content
                  </button>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleAddContentBlock("code")}
                  >
                    Add Code
                  </button>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleAddContentBlock("image")}
                  >
                    Add Image
                  </button>
                </div>
              )}
            </div>
            <input
              name="tag"
              type="text"
              placeholder="Tags"
              className="mb-4 pl-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
              onChange={handleChange}
              required
            />
            <input
              name="slug"
              type="text"
              placeholder="slug or url"
              className="mb-4 pl-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
              onChange={handleChange}
              required
            />
            <input
              name="videourl"
              type="url"
              placeholder="video link"
              className="mb-4 pl-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
              onChange={handleChange}
            />
            {/* //////////////////// */}
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-lg text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none mb-4 rounded-md"
              id="file_input"
              type="file"
              onChange={handleZipFileChange}
            />
            <input
              className="mb-2 pl-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-500"
              id="readingtime"
              name="readingtime"
              type="text"
              placeholder="reading time"
              onChange={handleChange}
            />
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

export default WriteBlog;
