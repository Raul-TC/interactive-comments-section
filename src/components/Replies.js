import React, { useState } from "react";
import iconReply from "../assets/icon-reply.svg";
import iconDelete from "../assets/icon-delete.svg";
import iconEdit from "../assets/icon-edit.svg";
import amy from "../assets/avatars/image-amyrobson.png";
import juliusomo from "../assets/avatars/image-juliusomo.png";
import max from "../assets/avatars/image-maxblagun.png";
import ramses from "../assets/avatars/image-ramsesmiron.png";
const Replies = ({
  id,
  score,
  username,
  dateCreate,
  replyingTo,
  content,
  handleUpdateComment,
}) => {
  const [updatebutton, setUpdatebutton] = useState(false);
  let userImg;
  if (username === "amyrobson") {
    userImg = amy;
  } else if (username === "maxblagun") {
    userImg = max;
  } else if (username === "ramsesmiron") {
    userImg = ramses;
  } else if (username === "juliusomo") {
    userImg = juliusomo;
  }
  return (
    <div className="card">
      <div className="score">
        <button>+</button>
        {score}
        <button>-</button>
      </div>
      <div className="mainContent">
        <div className="userData">
          <img src={userImg} alt="imageUser" />
          <p>{username}</p>
          {username === "juliusomo" && <span className="you">you</span>}
          <span>{dateCreate}</span>
        </div>
        <div className="reply">
          {username === "juliusomo" ? (
            <>
              <span>
                <img src={iconDelete} alt="iconDelete" />
                <span>Delete</span>
              </span>
              <span>
                <img src={iconEdit} alt="iconEedit" />
                <span
                  onClick={() => {
                    setUpdatebutton(true);
                    handleUpdateComment(id);
                  }}
                >
                  Edit
                </span>
              </span>
            </>
          ) : null}
        </div>
        <div className="text">
          <p>
            <span className="taggedUser">{`@${replyingTo}`}</span>
            {content}
          </p>
          {username === "juliusomo" ? (
            <>
              <button className={updatebutton ? "update" : "none"}>
                Update
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Replies;
