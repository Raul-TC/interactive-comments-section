import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../context/MainContext'

const ScoreCounter = ({ id, score, type, idMain, vote, replies }) => {
  const [counter, setCounter] = useState(score)
  const [voted, setVoted] = useState(vote ?? false)
  const [method, setMethod] = useState(null)

  const { updateScore } = useContext(MainContext)

  const counterScorePlus = () => {
    if (!voted) {
      setCounter(counter + 1)
      setMethod(true)
      setVoted(true)
    }
  }

  const counterScoreMinus = () => {
    if (voted) {
      setCounter(counter - 1)
      setMethod(false)
      setVoted(false)
    }
  }

  useEffect(() => {
    updateScore(type, counter, id, idMain, method, replies)
  }, [counter])

  return (
    <div className='score'>
      <button onClick={counterScorePlus} className={voted ? 'actiPapi' : null}>
        +
      </button>
      <span>{counter}</span>
      <button onClick={counterScoreMinus}>-</button>
    </div>
  )
}

export default ScoreCounter
