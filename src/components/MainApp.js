import React, { useContext } from 'react'
import Comments from './Comments'
import MainContext from '../context/MainContext'
import AddNewComment from './AddNewComment'

const MainApp = () => {
  const { data } = useContext(MainContext)
  return (

    <div className='contentMain'>
      {data.length !== 0 &&
        data.comments.map((el) => (
          <Comments
            key={el.id}
            id={el.id}
            username={el.user.username}
            content={el.content}
            score={el.score}
            dateCreate={el.createdAt}
            replies={el.replies}
            vote={el.vote}
          />
        ))}
      <AddNewComment />
    </div>

  )
}

export default MainApp
