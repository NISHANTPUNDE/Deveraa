"use client";

import logo from "@/assets/deveraa.jpg";
import Image from "next/image";

const AdminTopbar = () => {
  return (
    <>
      <header className="pl-24 shadow-md py-4 px-4 bg-white z-30">
        <label className="font-bold uppercase text-xl md:text-2xl text-red-400">
          <Image src={logo} alt="Logo" className="w-32" />
        </label>
      </header>
    </>
  );
};

export default AdminTopbar;
