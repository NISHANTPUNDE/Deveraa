"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_BASE_URL } from "@/lib/Constant";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import logo from "@/assets/deveraa.jpg";
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
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm("");
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="navbar bg-white shadow-md py-4 ">
        <div className="container mx-auto px-4 md:px-8 lg:px-28 flex justify-between items-center">
          {/* Logo on the left */}
          <div className="logo">
            <Image src={logo} alt="Logo" className="w-32" />
          </div>

          {/* Right-side container */}
          <div className="flex items-center space-x-5">
            {/* Search bar and icon */}
            <div className="relative flex items-center ">
              <div className="flex items-center space-x-4 mr-2">
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
                  {tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/tags/${tag}`}
                      className="hidden md:block text-gray-700 text-nowrap hover:text-blue-500 font-semibold transition duration-300"
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </Link>
                  ))}
                </div>

                {tags.length > 4 && !isScrolledLeft && (
                  <button onClick={scrollRight}>
                    <FaChevronRight className="text-gray-700 hover:text-blue-500 transition duration-300" />
                  </button>
                )}
              </div>

              {!isSearchOpen && (
                <button
                  ref={searchButtonRef}
                  className="hidden md:block text-gray-700 text-2xl hover:text-blue-500 transition duration-300 mx-[30px]"
                  onClick={toggleSearchBar}
                >
                  <AiOutlineSearch />
                </button>
              )}

              <div
                className={`transition-all duration-300 absolute right-0 ${
                  isSearchOpen ? "w-80 opacity-100" : "w-0 opacity-0"
                } overflow-hidden`}
              >
                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Search by topics"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  className="p-2 px-4 rounded-full border border-gray-300 focus:outline-none w-full"
                />
              </div>

              {isAutocompleteOpen && isSearchOpen && (
                <ul className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {filteredTags.length > 0 ? (
                    filteredTags.map((tag, index) => (
                      <li
                        key={index}
                        className="py-2 px-4 hover:bg-blue-100 cursor-pointer"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          router.push(`/tags/${tag}`);
                        }}
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </li>
                    ))
                  ) : (
                    <li
                      className="py-2 px-4 hover:bg-blue-100 cursor-pointer"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        router.push(`/`);
                      }}
                    >
                      No posts found for these
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Home link */}
            <Link href="/" className="no-underline cursor-pointer">
              <button className="homebutton px-6 py-2.5 bg-blue-600 rounded-full text-white hidden md:block">
                Recent Blog
              </button>
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isMenuOpen ? (
                  <AiOutlineClose className="text-xl text-gray-700" />
                ) : (
                  <AiOutlineMenu className="text-xl text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-10 h-full">
            <div className="p-4">
              <input
                type="text"
                placeholder="Search tags"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full py-2 px-5 mb-4 rounded-[25px] border border-gray-300 focus:outline-none "
              />
              <ul>
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag, index) => (
                    <li
                      key={index}
                      className="py-4 text-gray-700 text-nowrap hover:text-blue-500 font-semibold transition duration-300"
                    >
                      <Link
                        href={`/tags/${tag}`}
                        onClick={toggleMenu}
                        className="px-2 text-gray-700 text-nowrap hover:text-blue-500 font-semibold transition duration-300"
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="py-4 text-gray-700 text-nowrap hover:text-blue-500 font-semibold transition duration-300">
                    <Link
                      href={`/`}
                      className="px-2 text-gray-700 text-nowrap hover:text-blue-500 font-semibold transition duration-300"
                    >
                      <li
                        className="py-2 px-4  cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/`);
                          setIsMenuOpen(false);
                        }}
                      >
                        No posts found for these
                      </li>
                    </Link>
                  </li>
                )}
              </ul>
              {/* Home link */}
              <div className="absolute bottom-[100px] w-[90%] left-1/2 transform -translate-x-1/2">
                <div className="homebutton px-6 py-2.5 bg-blue-500 rounded-full text-white block text-center md:hidden">
                  <Link href="/" className="no-underline" onClick={toggleMenu}>
                    Recent Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Topbar;
