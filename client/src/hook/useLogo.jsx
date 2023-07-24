import { useEffect, useState } from "react";

export const useLogo = () => {
  const mobileLogo =
    "https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg";
  const desktopLogo =
    "https://res.cloudinary.com/dd39ktpmz/image/upload/v1688023086/gaz8ukr8idpfwleozqug.png";

  const [logo, setLogo] = useState(
    window.innerWidth > 758 ? desktopLogo : mobileLogo
  );
  const [isMoblie, setIsMobile] = useState(window.innerWidth < 758);

  useEffect(() => {
    const handleResize = () => {
      setLogo(window.innerWidth > 758 ? desktopLogo : mobileLogo);
      setIsMobile(window.innerWidth < 758);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { logo, isMoblie };
};
