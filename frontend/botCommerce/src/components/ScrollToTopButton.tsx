import React, { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isInFooter, setIsInFooter] = useState<boolean>(false);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const footerElement = document.querySelector("#footer");
    footerRef.current = footerElement as HTMLElement;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInFooter(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 rounded-full p-2 shadow-lg transition-colors ${
          isInFooter
            ? "bg-red-600 hover:bg-red-700"
            : "bg-black text-white hover:bg-gradient-to-b from-black to-gray-950"
        }`}
        aria-label="Scroll to Top"
      >
        <FaArrowUp size={24} />
      </button>
    )
  );
};

export default ScrollToTopButton;
