"use client";

import AdminSidePanel from "@/components/AdminSidePanel";
import { useState } from "react";
import Image from "next/image";
import { NEXT_PUBLIC_BASE_URL } from "@/app/lib/Constant";

const DeleteBlog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [datapost, setDatapost] = useState({});

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
    console.log(datapost);
  }

  const handleClick = async () => {
    try {
      const res = await fetch(
        `${NEXT_PUBLIC_BASE_URL}/api/write/delete/${datapost.slug}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        alert("deleted successfully");
      }
    } catch (error) {
      alert("error deleting");
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
          {/* //////////////// */}
          <div className="block w-full border border-b-indigo-900 mb-4"></div>
          {/* ///////////////// */}

          <div className="flex items-center justify-start">
            <div>
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="">
              <h2 className="text-xl font-bold">{datapost?.title}</h2>
              <div>
                <h3 className=" text-lg text-gray-500 ">
                  {datapost?.description}
                </h3>
              </div>
              <div>
                <div className="flex items-center">
                  <span>{datapost?.date}</span>
                  <span className="text-sm text-gray-500 ml-4">
                    {datapost?.readingtime}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button
                className="w-48 h-10 px-6 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                onClick={handleClick}
              >
                Delete
              </button>
            </div>
          </div>

          {/* ////////// */}
        </main>
      </div>
    </>
  );
};

export default DeleteBlog;
