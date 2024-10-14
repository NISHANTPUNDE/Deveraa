"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_BASE_URL } from "@/lib/Constant";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import logo from "@/assets/deveraa.png";
import Image from "next/image";

const Topbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const searchButtonRef = useRef(null);
  const scrollContainer = useRef(null);
  const [isScrolledLeft, setIsScrolledLeft] = useState(true);

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

  const scrollLeft = () => {
    scrollContainer.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainer.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const { scrollLeft } = scrollContainer.current;
    setIsScrolledLeft(scrollLeft === 0);
  };

  useEffect(() => {
    const container = scrollContainer.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsAutocompleteOpen(value.length > 0);
  };

  const handleAutocompleteSelect = (tag) => {
    setSearchTerm(tag);
    setIsAutocompleteOpen(false);
  };

  const handleSearch = () => {
    router.push(`/tags/${searchTerm}`);
  };

  const toggleSearchBar = () => {
    setIsSearchOpen(true); // Ensure it opens the search bar
    setTimeout(() => searchRef.current?.focus(), 100); // Focus on the input after rendering
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Effect to close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if click is outside both search input and button
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(e.target)
      ) {
        console.log("Click detected outside search input and button");

        // Close the search input and show the search icon
        setIsSearchOpen(false);
        setSearchTerm(""); // Optionally clear the search term
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      console.log("Removed event listener");
    };
  }, [searchRef, searchButtonRef]);

  return (
    <>
      <header className="flex justify-between md:justify-around fixed top-0 left-0 w-full items-center gap-5 md:gap-14 shadow-md py-4 px-4 bg-white z-20">
        <label className="font-bold uppercase text-xl md:text-2xl text-red-400">
          <Link href={"/"}>
            <Image src={logo} alt="Logo" className="w-32" />
          </Link>
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
                {tags
                  .filter((tag) =>
                    tag.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((tag, index) => (
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
                  ))}
              </ul>
            </div>
          </div>
        )}

        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center space-x-4">
            {!isScrolledLeft && (
              <button onClick={scrollLeft}>
                <FaChevronLeft className="text-gray-700 hover:text-blue-500 transition duration-300" />
              </button>
            )}
            {isScrolledLeft && <div className="w-[16px]"></div>}

            <div
              ref={scrollContainer}
              className="md:flex items-center overflow-x-auto max-w-[400px] gap-8"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-700 text-nowrap hover:text-blue-500 font-semibold transition duration-300"
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </Link>
                ))
              ) : (
                <p className="text-gray-500"></p>
              )}
            </div>
            {tags.length > 4 && !isScrolledLeft && (
              <button onClick={scrollRight}>
                <FaChevronRight className="text-gray-700 hover:text-blue-500 transition duration-300" />
              </button>
            )}
          </div>

          <div className="relative flex items-center justify-center w-full md:w-auto">
            {!isSearchOpen && (
              <button
                ref={searchButtonRef}
                className="text-gray-700 text-2xl hover:text-blue-500 transition duration-300"
                onClick={toggleSearchBar}
              >
                <AiOutlineSearch />
              </button>
            )}

            {isSearchOpen && (
              <input
                ref={searchRef}
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                className="py-2 px-4 rounded-full border focus:outline-none focus:ring-1 focus:ring-blue-200 text-gray-700 w-96 transition-all duration-500 ease-in-out"
              />
            )}

            {isAutocompleteOpen && tags.length > 0 && (
              <ul className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {tags
                  .filter((tag) =>
                    tag.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((tag, index) => (
                    <li
                      key={index}
                      className="py-2 px-4 hover:bg-blue-100 cursor-pointer"
                      onClick={() => handleAutocompleteSelect(tag)}
                    >
                      {tag}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Topbar;
