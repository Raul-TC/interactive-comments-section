import React from 'react'
import iconReply from '../../assets/icon-reply.svg'
import iconDelete from '../../assets/icon-delete.svg'
import iconEdit from '../../assets/icon-edit.svg'
const ActionsButtons = ({ username, setModal, updatebutton, setUpdateButton, addReply, setAddReply }) => {
  return (
    <>
      {username === 'juliusomo'
        ? (
          <>
            <button
              className='deleteComment'
              onClick={() => setModal(true)}
            >
              <img src={iconDelete} alt='iconDelete' />
              <span>Delete</span>
            </button>
            <button
              className='editComment'
              onClick={() =>
                updatebutton
                  ? setUpdateButton(false)
                  : setUpdateButton(true)}
            >
              <img src={iconEdit} alt='iconEdit' />
              <span>Edit</span>
            </button>
          </>
          )
        : (
          <>
            <button
              onClick={() =>
                addReply ? setAddReply(false) : setAddReply(true)}
              className='rep'
            >
              <img src={iconReply} alt='iconReply' />
              <span>Reply</span>
            </button>
          </>
          )}
    </>
  )
}

export default ActionsButtons
