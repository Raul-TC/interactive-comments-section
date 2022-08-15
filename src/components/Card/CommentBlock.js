import React, { useContext, useState } from 'react'

import MainContext from '../../context/MainContext'

const CommentBlock = ({ type, content, replyingTo, updatebutton, id, idContent, replies, setUpdateButton }) => {
  const { updateReplies } = useContext(MainContext)
  const [updateComment, setUpdateComment] = useState('')

  const validateData = (e) => {
    e.preventDefault()
    if (updateComment.replace(`@${replyingTo}`, '').trim() === '') {
      alert('No puedes enviar espacios en blanco')
    } else {
      updateReplies(
        e,
        id,
        idContent,
        type,
        updateComment.replace(`@${replyingTo}`, '').trim(),
        replies
      )
      setUpdateButton(false)
      setUpdateComment('')
    }
  }
  return (
    <>
      {updatebutton
        ? (
          <>
            <form
              className='replie-update'
              onSubmit={(e) => {
                validateData(e)
              }}
            >
              <textarea
                name='comment block'
                id={id}
                defaultValue={
                      replyingTo !== ''
                        ? `@${replyingTo} ${content}`
                        : `${content}`
                    }
                onChange={(e) => setUpdateComment(e.target.value)}
              />
              {updateComment.replace(`@${replyingTo}`, '').trim() === ''
                ? (
                  <>
                    <button disabled>
                      {updatebutton ? 'UPDATE' : 'SEND'}
                    </button>
                  </>
                  )
                : (
                  <>
                    <button className='update'>
                      {updatebutton ? 'UPDATE' : 'SEND'}
                    </button>
                  </>
                  )}
            </form>
          </>
          )
        : (
          <>
            <p>
              <span className='taggedUser'>
                {replyingTo === '' ? '' : `@${replyingTo}`}
                {/* @{replyingTo} */}
              </span>
              <span className='comment'>{content}</span>
            </p>
          </>
          )}
    </>
  )
}

export default CommentBlock
