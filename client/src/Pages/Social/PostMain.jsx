import React, { useCallback, useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostById } from "../../actions/social";
import { Post } from "../../components/Social/Post";
import { Dialog} from "../../components/Dialog/Dialog";
import { follow, unfollow } from "../../actions/auth";


export const PostMain = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [url, setUrl] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const { posts } = useSelector((state) => state.socialReducer);

  useEffect(() => {
    id && dispatch(getPostById(id));
  }, [id, dispatch]);

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

  const handleDelete = useCallback(
    (id) => {
      dispatch(deletePost(id));
      navigate("/social");
    },
    [dispatch, navigate]
  );

  const handleFollowers = useCallback(
    (id, isFollow) => {
      isFollow ? dispatch(unfollow(id)) : dispatch(follow(id));
    },
    [dispatch]
  );

  console.log(posts, "posts in postmain");
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <div>
          <div className="posts-contianer">
            {posts && posts.length > 0 && (
              <Post
                {...posts[0]}
                key={`${posts[0]._id}--${0}`}
                handleUserClick={handleUserClick}
                handleShareClick={handleShareClick}
                handleFollowers={handleFollowers}
                showDelete={true}
                handleDelete={handleDelete}
              />
            )}
            <Dialog isOpen={open} setIsOpen={setOpen} url={url} />
          </div>
        </div>
      </div>
    </div>
  );
};
