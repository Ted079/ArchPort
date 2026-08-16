import { useEffect, useState } from "react";

export const UseScrolled = (scroll = 500) => {
  const [isScrolled, setIsCrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCrolled(window.scrollY > scroll);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  return isScrolled;
};

export default UseScrolled;
