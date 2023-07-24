import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import UploadWidget from "../Upload/UploadWidget";
import { useDispatch } from "react-redux";
import { addPost } from "../../actions/social";
import { useNavigate } from "react-router-dom";
import { Player } from "video-react";

export const AddPostForm = () => {
  const [value, setValue] = useState("");
  const [uploadBtn, setUploadBtn] = useState("Upload image or video");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [isImage, setIsImage] = useState(false);

  const navigate = useNavigate();

  const handleOnUpload = (error, result, widget) => {
    if (error) {
      setError(error);
      widget.close({
        quiet: true,
      });
      setUploadBtn("try again");
      return;
    }
    setTimeout(() => {
      setUrl(result?.info?.secure_url);
    }, 500);
    setUploadBtn("upload done");
  };

  const handleAddPost = () => {
    console.log(value, "value", url, "url");

    if (!url || !value) {
      return;
    }
    console.log(value, "value", url, "url");
    dispatch(addPost(value, url));
    navigate(`/social`);
  };

  useEffect(() => {
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg|tiff|ico|webp)$/i;
    // const videoExtensions = /\.(mp4|mov|avi|wmv|flv|mkv)$/i;

    const isImage = imageExtensions.test(url);
    // const isVideo = videoExtensions.test(url);

    setIsImage(isImage);
  }, [url]);

  return (
    <div className="post-form-container">
      <div className="post-form-container-sub">
        <label htmlFor="description">Description</label>
        <TextareaAutosize
          className="post-form-textarea"
          cacheMeasurements
          value={value}
          id="description"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <label htmlFor="file">File</label>
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return (
              <button className="btn-upload" onClick={handleOnClick}>
                {uploadBtn}
              </button>
            );
          }}
        </UploadWidget>
        {url && isImage ? (
          <img src={url} alt={"uploaded"} width={250} />
        ) : (
          url && (
            <Player width={250}>
              <source src={url} />
            </Player>
          )
        )}
        {error && <p>{error}</p>}
        <button className="btn-submit" onClick={() => handleAddPost()}>
          Create post
        </button>
      </div>
    </div>
  );
};
