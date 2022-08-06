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
  enabledTextArea,
  data,
  setdata,
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

  const [updateComment, setUpdateComment] = useState("");
  const [repliesComment, setrepliesComment] = useState(replies);
  const [updatebutton, setupdatebutton] = useState(false);
  const [addReply, setAddReply] = useState(false);
  const [reply, setReply] = useState("");
  // console.info(data);
  const updateReplies = (e, ide, type, datos) => {
    e.preventDefault();
    if (type === "comment") {
      const res = data.comments.map((el) => {
        return el.id === ide
          ? {
              ...el,
              content: updateComment,
              createdAt: new Date().toLocaleString(),
            }
          : el;
      });
      let newObjet = {
        currentUser: data.currentUser,
        comments: [...res],
      };
      setdata(newObjet);
      setUpdateComment("");
      setupdatebutton(false);
    }

    if (type === "replies") {
      const res = replies.map((el) => {
        return el.id === ide
          ? {
              ...el,
              content: datos,
            }
          : el;
      });

      const res2 = data.comments.map((el) => {
        console.info(id);
        console.info(el);
        return el.id === id ? { ...el, replies: [...res] } : el;
      });

      console.info(res2);
      let newObjet = {
        currentUser: data.currentUser,
        comments: [...res2],
      };
      setdata(newObjet);
    }
  };

  const deleteComment = (ide, type) => {
    if (type === "comment") {
      console.info(`Eliminar ${id}`);

      const res = data.comments.filter((el) => el.id !== ide);

      console.info(res);

      let newObjet = {
        currentUser: data.currentUser,
        comments: [...res],
      };
      setdata(newObjet);
    } else {
      const res = replies.filter((el) => el.id !== ide);

      const res2 = data.comments.map((el) =>
        el.id === id ? { ...el, replies: [...res] } : el
      );

      console.info(res2);
      let newObjet = {
        currentUser: data.currentUser,
        comments: [...res2],
      };
      setdata(newObjet);
    }
  };

  const replyComment = (e) => {
    e.preventDefault();
    e.target.reset();
    let newData = {
      id: crypto.randomUUID(),
      content: updateComment,
      createdAt: new Date().toLocaleString(),
      score: 0,
      replyingTo: reply,
      user: {
        image: { juliusomo },
        username: "juliusomo",
      },
      replies: [],
    };

    // setrepliesComment([...repliesComment, newData]);

    const res = data.comments.map((el) =>
      el.id === id
        ? {
            ...el,
            replies: [...replies, newData],
          }
        : el
    );

    let newObjet = {
      currentUser: data.currentUser,
      comments: [...res],
    };
    setdata(newObjet);
    setAddReply(false);
  };
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
                  <span onClick={() => deleteComment(id, "comment")}>
                    Delete
                  </span>
                </span>
                <span>
                  <img src={iconEdit} alt="iconEedit" />
                  <span
                    onClick={() => {
                      setupdatebutton(true);
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
                <textarea
                  name=""
                  defaultValue={content}
                  onChange={(e) => setUpdateComment(e.target.value)}
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </>
            ) : (
              <p>{content}</p>
            )}

            {username === "juliusomo" ? (
              <>
                <button
                  onClick={(e) => updateReplies(e, id, "comment", "")}
                  className={updatebutton ? "update" : "none"}
                >
                  Update
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {addReply ? (
        <>
          <div className="addComment">
            <img src={juliusomo} alt="me" />

            <form onSubmit={(e) => replyComment(e, username)}>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) => setUpdateComment(e.target.value)}
              ></textarea>
              <button>Send</button>
            </form>
          </div>
        </>
      ) : null}
      <div className="commentarios">
        {repliesComment.length > 0 &&
          repliesComment.map((el) => (
            <Replies
              key={crypto.randomUUID()}
              id={el.id}
              score={el.score}
              username={el.user.username}
              dateCreate={el.createdAt}
              replyingTo={el.replyingTo}
              content={el.content}
              enabledTextArea={enabledTextArea}
              setAddReply={setAddReply}
              setReply={setReply}
              updateReplies={updateReplies}
              deleteComment={deleteComment}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
