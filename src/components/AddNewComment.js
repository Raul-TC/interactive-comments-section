import React, { useContext, useState } from 'react'
import { userImage } from '../assets/helpers/userImage'
import MainContext from '../context/MainContext'

const AddNewComment = ({ type, id, username, replies, setAddReply }) => {
  const { addNewComment } = useContext(MainContext)
  const [addComment, setAddComment] = useState('')
  let className = ''
  switch (type) {
    case 'reply':
      className = 'card replie mt'
      break
    case 'comments':
      className = 'card mt'
      break
    default:
      className = 'card cardContainer mt'
      break
  }
  const validateData = (e) => {
    e.preventDefault()
    if (addComment.replace(`@${username}`, '').trim() === '') {
      alert('No puedes enviar espacios en blanco')
    } else {
      addNewComment(e, type, addComment.trim(), id, username, replies)
      if (type === 'reply' || type === 'comments') { setAddReply(false) }
    }
  }
  return (
    <div className={className}>
      <div className='containerAddComment'>
        <div className='desktop'>
          <img src={userImage('juliusomo')} alt='me' className='me-img' />
          <form onSubmit={(e) => {
            validateData(e)
          }}
          >
            <textarea id={id} name='addCommentTextTarea' defaultValue={type === 'reply' || type === 'comments' ? `@${username} ` : ''} placeholder='Add a comment' onChange={(e) => setAddComment(e.target.value)} />
            {addComment.replace(`@${username}`, '') === '' ? <><button disabled className='replyButton'>{type === 'reply' ? 'REPLY' : 'SEND'}</button></> : <><button className='replyButton'>{type === 'reply' ? 'REPLY' : 'SEND'}</button></>}
          </form>
        </div>
        <div className='mobile'>
          <form onSubmit={(e) => {
            validateData(e)
          }}
          >
            <textarea id={id} name='addCommentTextTarea' defaultValue={type === 'reply' || type === 'comments' ? `@${username} ` : ''} placeholder='Add a comment' onChange={(e) => setAddComment(e.target.value)} />
            <div className='bottom'>
              <img src={userImage('juliusomo')} alt='me' className='me-img' />
              {addComment.replace(`@${username}`, '') === '' ? <><button disabled className='replyButton'>{type === 'reply' ? 'REPLY' : 'SEND'}</button></> : <><button className='replyButton'>{type === 'reply' ? 'REPLY' : 'SEND'}</button></>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNewComment
