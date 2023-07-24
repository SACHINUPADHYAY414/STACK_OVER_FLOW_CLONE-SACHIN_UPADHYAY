import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Post } from "./Post";
import { useNavigate } from "react-router-dom";
import { Dialog} from "../Dialog/Dialog";
import { follow, unfollow } from "../../actions/auth";

export const Posts = () => {
  const { posts } = useSelector((state) => state.socialReducer);
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState("");

  const navigate = useNavigate();

  const handleUserClick = useCallback(
    (id) => {
      navigate(`/Users/${id}`);
    },
    [navigate]
  );

  const handleShareClick = useCallback(
    (id) => {
      setUrl(`${window.location.origin}/post/${id}`);
      setOpen(true);
    },
    [setOpen, setUrl]
  );

  const dispatch = useDispatch();
  const handleFollowers = useCallback(
    (id, isFollow) => {
      isFollow ? dispatch(unfollow(id)) : dispatch(follow(id));
    },
    [dispatch]
  );

  return (
    <div className="posts-contianer">
      {posts &&
        posts.length > 0 &&
        posts.map((post, i) => (
          <Post
            {...post}
            key={`${post._id}--${i}`}
            handleUserClick={handleUserClick}
            handleShareClick={handleShareClick}
            handleFollowers={handleFollowers}
          />
        ))}
      <Dialog isOpen={open} setIsOpen={setOpen} url={url} />
    </div>
  );
};
