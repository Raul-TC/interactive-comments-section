import React, { useContext, useState } from 'react'
import Replies from './Replies'
import Modal from './Modal'
import ScoreCounter from './Card/ScoreCounter'
import MainContext from '../context/MainContext'
import UserData from './Card/UserData'
import ActionsButtons from './Card/ActionsButtons'
import AddNewComment from './AddNewComment'
import CommentBlock from './Card/CommentBlock'

const Comments = ({
  id,
  username,
  content,
  score,
  dateCreate,
  replies,
  vote
}) => {
  const { updateScore } = useContext(MainContext)
  // const [updateComment, setUpdateComment] = useState('')
  const [updatebutton, setUpdateButton] = useState(false)
  const [addReply, setAddReply] = useState(false)
  const [modal, setModal] = useState(false)

  return (
    <>
      <div className='cardContainer'>
        <div className='card'>
          <div className='desktop'>
            <ScoreCounter
              key={id}
              type='comment'
              score={score}
              id={id}
              vote={vote}
              updateScore={updateScore}
              replies={replies}
            />
          </div>
          <div className='mobile'>
            <ScoreCounter
              key={id}
              type='comment'
              score={score}
              id={id}
              vote={vote}
              updateScore={updateScore}
              replies={replies}
            />
            <div className='actionComment mobile'>
              <ActionsButtons username={username} setModal={setModal} updatebutton={updatebutton} setUpdateButton={setUpdateButton} addReply={addReply} setAddReply={setAddReply} />
            </div>

          </div>
          {/* Desktop */}
          <div className='containerText'>
            <div className='userContainer'>
              <UserData username={username} replies={replies} dateCreate={dateCreate} />
              <div className='actionComment desktop'>
                <ActionsButtons username={username} setModal={setModal} updatebutton={updatebutton} setUpdateButton={setUpdateButton} addReply={addReply} setAddReply={setAddReply} />
              </div>
            </div>
            <div className='text'>
              <CommentBlock type='comment' content={content} replyingTo='' updatebutton={updatebutton} id={id} idContent={id} replies={replies} setUpdateButton={setUpdateButton} />
            </div>
          </div>
        </div>
        {addReply && (
          <AddNewComment type='comments' id={id} username={username} replies={replies} setAddReply={setAddReply} />
        )}
        <div className='commentarios'>
          {replies.length > 0 &&
            replies.map((el) => (
              <Replies
                key={el.id}
                id={el.id}
                score={el.score}
                username={el.user.username}
                dateCreate={el.createdAt}
                replyingTo={el.replyingTo}
                content={el.content}
                replies={replies}
                idContent={id}
                vote={el.vote}
              />
            ))}
        </div>
      </div>

      {modal && (
        <Modal
          id={id}
          setModal={setModal}
          replies={replies}
          idContent={id}
          type='comment'
        />
      )}
    </>
  )
}

export default Comments
