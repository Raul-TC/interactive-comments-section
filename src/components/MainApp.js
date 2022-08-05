import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import juliusomo from "../assets/avatars/image-juliusomo.png";
import { helpHttp } from "../assets/helpers/helpHttp";

const MainApp = () => {
  const [data, setdata] = useState([]);
  const [addComment, setAddComment] = useState("");
  const [enabledTextArea, setEnabledTextArea] = useState(false);
  useEffect(() => {
    helpHttp()
      .get("./db/data.json")
      .then((res) => {
        setdata(res);
      });
  }, []);

  const handleAddComment = (e) => {
    e.preventDefault();
    e.target.reset();

    let newData = {
      id: crypto.randomUUID(),
      content: addComment,
      createdAt: new Date().toLocaleString(),
      score: 0,
      user: {
        image: { juliusomo },
        username: "juliusomo",
      },
      replies: [],
    };
    let newObjet = {
      currentUser: data.currentUser,
      comments: [...data.comments, newData],
    };
    setdata(newObjet);
    setAddComment("");
  };

  const handleUpdateComment = (id) => {
    setEnabledTextArea(true);
    console.info(id);
  };
  return (
    <div className="containerMain">
      {data.length !== 0 &&
        data.comments.map((el) => (
          <Comments
            key={crypto.randomUUID()}
            id={el.id}
            username={el.user.username}
            content={el.content}
            score={el.score}
            dateCreate={el.createdAt}
            replies={el.replies}
            handleUpdateComment={handleUpdateComment}
            enabledTextArea={enabledTextArea}
          />
        ))}
      <div className="addComment">
        <img src={juliusomo} alt="me" />

        <form onSubmit={(e) => handleAddComment(e)}>
          <input
            type="text"
            onChange={(e) => {
              setAddComment(e.target.value);
            }}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default MainApp;
