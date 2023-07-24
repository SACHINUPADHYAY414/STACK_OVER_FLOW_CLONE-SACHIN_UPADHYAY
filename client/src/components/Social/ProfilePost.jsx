import React from "react";
import { useNavigate } from "react-router-dom";

export const ProfilePost = ({ url, _id }) => {
  const navitage = useNavigate();
  const handleClick = () => {
    navitage(`/post/${_id}`);
  };
  return (
    <div className="profile-post" onClick={handleClick}>
      <div
        className="profile-post-img"
        style={{
          backgroundImage: `url(${url})`,
        }}
      />
    </div>
  );
};
