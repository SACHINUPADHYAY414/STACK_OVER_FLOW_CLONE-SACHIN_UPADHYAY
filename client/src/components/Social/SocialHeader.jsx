import { useEffect } from "react";
import "./SocialComponents.css";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/social";
import { useNavigate } from "react-router-dom";

export const SocialHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleAddPost = () => {
    navigate(`/social/addpost`);
  };

  return (
    <div className="social-header">
      <h1 style={{ fontWeight: "400" }}>Social Posts </h1>
      <div>
        <button onClick={() => handleAddPost()}>{`Add post +`}</button>
      </div>
    </div>
  );
};
