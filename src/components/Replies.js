import React, { useContext, useState } from 'react'

import Modal from './Modal'
import ScoreCounter from './Card/ScoreCounter'
import MainContext from '../context/MainContext'
import UserData from './Card/UserData'
import ActionsButtons from './Card/ActionsButtons'

import AddNewComment from './AddNewComment'
import CommentBlock from './Card/CommentBlock'
const Replies = ({
  id,
  score,
  username,
  dateCreate,
  replyingTo,
  content,
  replies,
  idContent,
  vote
}) => {
  const { updateScore } = useContext(MainContext)
  const [updatebutton, setUpdateButton] = useState(false)
  const [addReply, setAddReply] = useState(false)
  const [updateComment, setUpdateComment] = useState('')
  const [modal, setModal] = useState(false)

  return (
    <>
      <div className='card replie'>
        <div className='desktop'>
          <ScoreCounter
            key={id}
            id={id}
            score={score}
            type='replies'
            idMain={idContent}
            updateScore={updateScore}
            vote={vote}
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
            <UserData username={username} dateCreate={dateCreate} />
            <div className='actionComment desktop'>
              <ActionsButtons username={username} setModal={setModal} updatebutton={updatebutton} setUpdateButton={setUpdateButton} addReply={addReply} setAddReply={setAddReply} />
            </div>
          </div>
          <div className='text'>
            <CommentBlock type='replies' content={content} replyingTo={replyingTo} updatebutton={updatebutton} id={id} idContent={idContent} updateComment={updateComment.replace(`@${replyingTo}, `, '')} replies={replies} setUpdateButton={setUpdateButton} setUpdateComment={setUpdateComment} />
          </div>
        </div>
        {modal && (
          <Modal
            setModal={setModal}
            id={id}
            idContent={idContent}
            type='replies'
            replies={replies}
          />
        )}
      </div>

      {addReply && (
        <AddNewComment type='reply' id={idContent} username={username} replies={replies} setAddReply={setAddReply} />
      )}
    </>
  )
}

export default Replies
