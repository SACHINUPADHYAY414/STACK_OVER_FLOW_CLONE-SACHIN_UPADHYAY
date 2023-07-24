import React, { memo, useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../../actions/social";
import { Player } from "video-react";

export const Post = memo(
  ({
    description,
    postBy,
    handleUserClick,
    url,
    _id,
    showDelete,
    handleShareClick,
    handleFollowers,
    handleDelete,
  }) => {
    const user = useSelector((state) => state.currentUserReducer);
    const dispatch = useDispatch();
    const [isFollow, setIsFollow] = useState(true);
    const [isLiked, setIsLiked] = useState(true);
    const [isImage, setIsImage] = useState(true);
    const [isOwner, setIsOwner] = useState(true);

    console.log(user);
    useEffect(() => {
      console.log(user, "user in post");
      let isOwner = !user
        ? undefined
        : user.posts?.findIndex((val) => val === _id);
      setIsOwner(isOwner !== undefined && isOwner !== -1 ? true : false);
    }, [_id, user]);

    useEffect(() => {
      let isFollow = !user
        ? undefined
        : user.followers?.findIndex((val) => val === postBy._id);
      setIsFollow(isFollow !== undefined && isFollow !== -1 ? true : false);
    }, [postBy._id, user]);

    useEffect(() => {
      let isLiked = !user
        ? undefined
        : user.likedPosts?.findIndex((val) => val === _id);
      setIsLiked(isLiked !== undefined && isLiked !== -1 ? true : false);
    }, [_id, user]);

    const handleIsLike = () => {
      isLiked ? dispatch(unlikePost(_id)) : dispatch(likePost(_id));
      setIsLiked(!isLiked);
    };

    useEffect(() => {
      const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg|tiff|ico|webp)$/i;
      // const videoExtensions = /\.(mp4|mov|avi|wmv|flv|mkv)$/i;

      const isImage = imageExtensions.test(url);
      // const isVideo = videoExtensions.test(url);

      setIsImage(isImage);
    }, [url]);

    return (
      <div className="post-container">
        <div className="post-card-header-container">
          <div
            className="post-card-name"
            onClick={() => {
              handleUserClick(postBy._id);
            }}
          >
            <Avatar classname={"avatar-user-nav"}>
              <p>{postBy?.name[0] ? postBy?.name[0] : ":)"}</p>
            </Avatar>
            <p>{postBy?.name}</p>
          </div>
          {!isOwner ? (
            <button
              className="follow-btn"
              onClick={() => {
                handleFollowers(postBy._id, isFollow);
                setIsFollow(!isFollow);
              }}
            >
              {isFollow ? "unfollow" : "follow"}
            </button>
          ) : (
            showDelete && (
              <button
                className="follow-btn"
                onClick={() => {
                  handleDelete(_id);
                }}
              >
                {"Delete"}
              </button>
            )
          )}
        </div>
        <div className="image">
          {isImage ? (
            <img
              src={url}
              alt={`${postBy?.name}-post-${description?.slice(0, 10)}`}
              width={"100%"}
              height={"100%"}
              className="post-image"
              loading="lazy"
            />
          ) : (
            <Player>
              <source src={url} />
            </Player>
          )}
        </div>
        <section className="post-share-container">
          <FontAwesomeIcon
            icon={isLiked ? faHeart : regularHeart}
            size="xl"
            onClick={() => handleIsLike()}
            className="like-icon"
          />
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            size="lg"
            onClick={() => {
              handleShareClick(_id);
            }}
          />
        </section>
        <div className="post-card-footer-container">
          <p>{description}</p>
        </div>
      </div>
    );
  }
);
