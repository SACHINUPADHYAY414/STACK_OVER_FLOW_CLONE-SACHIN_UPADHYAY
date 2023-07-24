import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { AddPostForm } from "../../components/Social/AddPostForm";

export const PostForm = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <AddPostForm />
      </div>
    </div>
  );
};
