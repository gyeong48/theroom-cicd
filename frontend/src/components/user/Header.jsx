import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const instaUrl = process.env.REACT_APP_INSTA_URL
  const blogUrl = process.env.REACT_APP_BLOG_URL
  const youtubeUrl = process.env.REACT_APP_YOUTUBE_URL

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1055] ${isScrolled ? "bg-white shadow-md" : "border-b border-black"} ${isMenuOpen ? "bg-white opacity-95" : ""}`}>
      <div className="flex items-center justify-between p-4">
        {/* 로고 */}
        <Link to={"/"}><img src="/assets/logos/theroomlogo.png" alt="The Room Logo" className="w-28 h-auto ml-0 md:ml-4" /></Link>

        {/* 햄버거 메뉴 버튼 (화면이 작아지면 나타남) */}
        <button
          className="block md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* 메뉴 리스트 */}
        <ul className={`md:flex md:flex-row md:justify-end md:space-x-6 md:space-y-0 md:items-center md:static md:top-auto md:left-auto md:p-0 md:h-0 md:opacity-100 ${isMenuOpen ? "flex" : "hidden"} flex-col space-x-0 space-y-4 absolute p-4 top-full left-0 w-full h-screen bg-white opacity-95`}>
          <li>
            <Link to={"/about"} className="text-lg md:text-base font-heading font-semibold">ABOUT</Link>
          </li>
          <li>
            <Link to={"/brand"} className="text-lg md:text-base font-heading font-semibold">BRAND</Link>
          </li>
          <li>
            <Link to={"/portfolio"} className="text-lg md:text-base font-heading font-semibold">PORTFOLIO</Link>
          </li>
          <li>
            <Link to={"/contact"} className="text-lg md:text-base font-heading font-semibold">CONTACT</Link>
          </li>
          <li>
            <a href={`${instaUrl}`} target="_blank" rel="noreferrer">
              <img
                src="/assets/logos/instagram.png"
                alt="instagram"
                className="w-6 h-6"
              />
            </a>
          </li>
          <li>
            <a href={`${blogUrl}`} target="_blank" rel="noreferrer">
              <img
                src="/assets/logos/blog.png"
                alt="blog"
                className="w-6 h-6"
              />
            </a>
          </li>
          <li>
            <a href={`${youtubeUrl}`} target="_blank" rel="noreferrer">
              <img
                src="/assets/logos/youtube.png"
                alt="youtube"
                className="w-6 h-6"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
