import React, { useState } from "react";
import iconReply from "../assets/icon-reply.svg";
import iconDelete from "../assets/icon-delete.svg";
import iconEdit from "../assets/icon-edit.svg";
import amy from "../assets/avatars/image-amyrobson.png";
import juliusomo from "../assets/avatars/image-juliusomo.png";
import max from "../assets/avatars/image-maxblagun.png";
import ramses from "../assets/avatars/image-ramsesmiron.png";
import Replies from "./Replies";
const Comments = ({
  id,
  username,
  content,
  score,
  dateCreate,
  replies,
  handleUpdateComment,
  enabledTextArea,
}) => {
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
    <div className="comm">
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
                  <span onClick={() => handleUpdateComment(id)}>Edit</span>
                </span>
              </>
            ) : (
              <>
                <img src={iconReply} alt="reply" />
                <span>Reply</span>
              </>
            )}
          </div>
          <div className="text">
            <p>{content}</p>

            {username === "juliusomo" ? (
              <>
                <button className={enabledTextArea ? "update" : "none"}>
                  Update
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="commentarios">
        {replies.length > 0 &&
          replies.map((el) => (
            <Replies
              key={crypto.randomUUID()}
              id={el.id}
              score={el.score}
              username={el.user.username}
              dateCreate={el.createdAt}
              replyingTo={el.replyingTo}
              content={el.content}
              handleUpdateComment={handleUpdateComment}
              enabledTextArea={enabledTextArea}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
