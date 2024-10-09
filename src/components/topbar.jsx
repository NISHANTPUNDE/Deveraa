"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_BASE_URL } from "@/lib/Constant";

const Topbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/tags/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch tags");
        }

        const data = await res.json();
        setTags(data?.tags);
      } catch (error) {
        console.error("Error fetching tags", error);
      }
    };

    fetchTags();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      setIsAutocompleteOpen(true);
    } else {
      setIsAutocompleteOpen(false);
    }
  };

  const handleAutocompleteSelect = (tag) => {
    setSearchTerm(tag);
    setIsAutocompleteOpen(false);
  };

  const handleSearch = () => {
    router.push(`/tags/${searchTerm}`);
  };

  return (
    <>
      <header className="flex items-center justify-between md:justify-normal gap-5 md:gap-14 shadow-md py-4 px-4">
        <label className="font-bold uppercase text-xl md:text-2xl text-red-400">
          <Link href={"/"}>Deveraa</Link>
        </label>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <AiOutlineClose className="text-2xl text-gray-700" />
            ) : (
              <AiOutlineMenu className="text-2xl text-gray-700" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-10">
            <div className="p-4">
              <input
                type="text"
                placeholder="Search tags"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <ul>
                {tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <li
                      key={index}
                      className="py-2 text-gray-800 border-b border-gray-300"
                    >
                      <Link
                        href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={toggleMenu}
                      >
                        {tag}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="py-2 text-gray-500">No tags found</li>
                )}
              </ul>
            </div>
          </div>
        )}

        <nav className="md:flex items-center hidden relative">
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="md:w-[45vw] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button
            className="ml-2 p-2 md:py-2 md:px-4 bg-gray-900 text-white rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>

          {isAutocompleteOpen && tags.length > 0 && (
            <ul className="absolute top-12 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleAutocompleteSelect(tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </nav>
      </header>
    </>
  );
};

export default Topbar;
