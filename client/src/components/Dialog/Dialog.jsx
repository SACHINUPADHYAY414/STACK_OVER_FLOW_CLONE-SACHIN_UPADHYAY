import React, { useEffect } from "react";
import "./Dialog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import {
  WhatsappIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const Dialog = ({ isOpen = true, setIsOpen, url }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  console.log(url);
  return (
    <>
      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog-container">
            <div className="dialog-header">
              <h4>Social share</h4>
              <FontAwesomeIcon
                icon={faXmark}
                className="xmark-icon"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="social-share-container">
              <div className="copy-to-clipboard">
                <CopyToClipboard
                  text={url}
                  onCopy={() => {
                    setIsOpen(false);
                  }}
                >
                  <button>{"Copy url"}</button>
                </CopyToClipboard>
              </div>
              <WhatsappShareButton url={url} onClick={() => setIsOpen(false)}>
                <WhatsappIcon round size={35} />
              </WhatsappShareButton>
              <FacebookShareButton url={url} onClick={() => setIsOpen(false)}>
                <FacebookIcon round size={35} />
              </FacebookShareButton>
              <LinkedinShareButton url={url} onClick={() => setIsOpen(false)}>
                <LinkedinIcon round size={35} />
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
