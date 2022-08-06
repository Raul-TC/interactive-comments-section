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
  setAddReply,
  setReply,
  updateReplies,
  deleteComment,
}) => {
  const [updatebutton, setUpdatebutton] = useState(false);
  const [replieData, setreplieData] = useState(`@${replyingTo}, ${content}`);
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
                <span onClick={() => deleteComment(id, "replies")}>Delete</span>
              </span>
              <span>
                <img src={iconEdit} alt="iconEedit" />
                <span
                  onClick={() => {
                    updatebutton
                      ? setUpdatebutton(false)
                      : setUpdatebutton(true);
                    // setUpdatebutton(true);
                  }}
                >
                  Edit
                </span>
              </span>
            </>
          ) : (
            <>
              <img src={iconReply} alt="reply" />
              <span
                onClick={() => {
                  setAddReply(true);
                  setReply(username);
                }}
              >
                Reply
              </span>
            </>
          )}
        </div>
        <div className="text">
          {updatebutton ? (
            <>
              <form
                onSubmit={(e) => updateReplies(e, id, "replies", replieData)}
              >
                <textarea
                  name=""
                  id=""
                  cols="30"
                  defaultValue={`${content}`}
                  rows="10"
                  onChange={(e) => setreplieData(e.target.value)}
                ></textarea>
                <button>Send</button>
              </form>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Replies;
