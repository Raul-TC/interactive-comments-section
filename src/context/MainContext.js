import { createContext, useEffect, useState } from 'react'
import { helpHttp } from '../assets/helpers/helpHttp'
import { userImage } from '../assets/helpers/userImage'
const MainContext = createContext()

const MainProvider = ({ children }) => {
  const localComments = JSON.parse(localStorage.getItem('comments'))
  const [data, setdata] = useState(
    localComments === null || localComments === 'undefined' ? [] : localComments
  )

  const image = userImage('juliusomo')
  const updateScore = (type, counterData, id, idMain, method, replies) => {
    if (type === 'comment') {
      const res = data.comments.map((el) => {
        return el.id === id
          ? {
              ...el,
              score: counterData,
              vote: method
            }
          : el
      })

      const newObjet = {
        currentUser: data.currentUser,
        comments: [...res]
      }
      setdata(newObjet)
    } else {
      const res = replies.map((el) => {
        return el.id === id
          ? {
              ...el,
              score: counterData,
              vote: method
            }
          : el
      })

      const res2 = data.comments.map((el) => {
        return el.id === idMain ? { ...el, replies: res } : el
      })

      const newObjet = {
        currentUser: data.currentUser,
        comments: [...res2]
      }

      setdata(newObjet)
    }
  }

  const updateReplies = (e, id, ide, type, datos, replies) => {
    e.preventDefault()

    if (type === 'comment') {
      const res = data.comments.map((el) => {
        return el.id === id
          ? {
              ...el,
              content: datos,
              createdAt: new Date()
            }
          : el
      })

      const newObjet = {
        currentUser: data.currentUser,
        comments: [...res]
      }
      setdata(newObjet)
    }

    if (type === 'replies') {
      const res = replies.map((el) => {
        return el.id === id
          ? {
              ...el,
              content: datos,
              createdAt: new Date()
            }
          : el
      })

      const res2 = data.comments.map((el) => {
        return el.id === ide ? { ...el, replies: [...res] } : el
      })

      const newObjet = {
        currentUser: data.currentUser,
        comments: [...res2]
      }
      setdata(newObjet)
    }
  }

  const deleteComment = (replies, id, idMain, type) => {
    if (type === 'comment') {
      const res = data.comments.filter((el) => el.id !== idMain)

      const newObjet = {
        currentUser: data.currentUser,
        comments: [...res]
      }
      setdata(newObjet)
    } else {
      const res = replies.filter((el) => el.id !== id)

      const res2 = data.comments.map((el) =>
        el.id === idMain ? { ...el, replies: [...res] } : el
      )

      const newObjet = {
        currentUser: data.currentUser,
        comments: [...res2]
      }
      setdata(newObjet)
    }
  }

  const addNewComment = (e, type, content, id, username, replies) => {
    e.preventDefault()
    e.target.reset()
    const newData = {
      id: crypto.randomUUID(),
      content: content.replace(`@${username}`, ''),
      createdAt: new Date(),
      score: 0,
      replyingTo: username,
      user: {
        image: { image },
        username: 'juliusomo'
      },
      replies: []
    }
    if (type === 'reply' || type === 'comments') {
      const res = data.comments.map((el) => {
        return el.id === id
          ? {
              ...el,
              replies: [...replies, newData]
            }
          : el
      }
      )

      const newObjet = {
        currentUser: data.currentUser,
        comments: [...res]
      }
      setdata(newObjet)
    } else {
      const newObjet = {
        currentUser: data.currentUser,
        comments: [...data.comments, newData]
      }
      setdata(newObjet)
    }
  }

  const getData = async () => {
    await helpHttp()
      .get('./db/data.json')
      .then(async (res) => {
        setdata(res)
      })
  }

  useEffect(() => {
    if (localComments === null || localComments === undefined) {
      getData()
    }
  }, [])

  localStorage.setItem('comments', JSON.stringify(data))

  const dataSend = { data, setdata, updateScore, updateReplies, deleteComment, addNewComment }

  return (
    <MainContext.Provider value={dataSend}>{children}</MainContext.Provider>
  )
}

export { MainProvider }
export default MainContext
