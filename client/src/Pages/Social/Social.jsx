import React from "react";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { SocialHeader } from "../../components/Social/SocialHeader";
import { Posts } from "../../components/Social/Posts";

export const Social = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <SocialHeader />
        <Posts />
      </div>
    </div>
  );
};
