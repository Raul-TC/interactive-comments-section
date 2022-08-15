import React, { useEffect, useState } from 'react'
import getDate from '../../assets/helpers/time'
import { userImage } from '../../assets/helpers/userImage'

const UserData = ({ username, dateCreate }) => {
  const [time, setTime] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const differenceInTime = new Date().getTime() - new Date(dateCreate).getTime()
      setTime(getDate(differenceInTime))
    }, 1000)

    return () => clearTimeout(timeout)
  }, [time, dateCreate])
  return (
    <div className='userData'>
      <img src={userImage(username)} alt='imageUser' />
      <p className='user'>{username}</p>
      {username === 'juliusomo' && <span className='you'>you</span>}
      <span className='date'>{` ${time}`}</span>
    </div>
  )
}

export default UserData
