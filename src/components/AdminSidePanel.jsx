"use client";

import { useRouter } from "next/navigation";
import React from "react";

const AdminSidePanel = () => {
  const router = useRouter();
  return (
    <div className="bg-white p-6 shadow-md w-full max-w-3xl md:w-[20vw] md:h-[90vh] h-max rounded-lg md:mx-4 my-4 md:my-0">
      <ul>
        <li>
          <button
            className="w-full h-12 bg-zinc-500 px-6 text-lg text-zinc-100  transition-colors duration-150  rounded-lg focus:shadow-outline hover:bg-zinc-400"
            onClick={() => router.push("/admin/write")}
          >
            Create
          </button>
        </li>
        <li>
          <button
            className="w-full my-4 h-12 bg-zinc-500 px-6 text-lg text-zinc-100 
        transition-colors duration-150  rounded-lg focus:shadow-outline hover:bg-zinc-400"
            onClick={() => router.push("/admin/write/edit")}
          >
            Update
          </button>
        </li>
        <li>
          <button
            className="w-full h-12 bg-zinc-500 px-6 text-lg text-zinc-100 transition-colors duration-150  rounded-lg focus:shadow-outline hover:bg-zinc-400"
            onClick={() => router.push("/admin/write/delete")}
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidePanel;
