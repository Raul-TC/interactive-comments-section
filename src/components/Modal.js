import React, { useContext } from 'react'
import MainContext from '../context/MainContext'

const Modal = ({ setModal, replies, id, idContent, type }) => {
  const { deleteComment } = useContext(MainContext)
  return (
    <div className='modalContainer'>
      <div className='modal'>
        <h1>Delete comment</h1>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div>
          <button className='cancel' onClick={() => setModal(false)}>
            NO, CANCEL
          </button>
          <button
            className='delete'
            onClick={() => deleteComment(replies, id, idContent, type)}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
