import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUserPosts } from "../../actions/social";
import { ProfilePost } from "./ProfilePost";

export const ProfilePosts = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.socialReducer);

  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(getCurrentUserPosts(id));
  }, [id, dispatch]);

  console.log(posts);

  return (
    <div className="profile-posts-contianer">
      <h4>Your posts</h4>
      <div className="profile-posts">
        {posts &&
          posts.length > 0 &&
          posts.map((post, i) => (
            <ProfilePost {...post} key={`${post._id}-${i}`} />
          ))}
      </div>
    </div>
  );
};
