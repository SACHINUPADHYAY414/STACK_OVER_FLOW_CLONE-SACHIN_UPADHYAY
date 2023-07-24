import { useEffect, useState } from "react";

export const useScrollToBottom = () => {
  const [showDownBtn, setShowDownBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollable =
        window.scrollY <
        document.documentElement.scrollHeight - (window.innerHeight + 100);
      setShowDownBtn(isScrollable);
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return { showDownBtn, scrollToBottom };
};
