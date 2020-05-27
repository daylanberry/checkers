import React from 'react'
import './Square.css'


const Square = (props) => {
  const { row, col, n, selectedPeice, changeSelectedPeice } = props

  const selected = selectedPeice[0] === row && selectedPeice[1] === col ? 'selected' : ''

  return (
    <div
      className={'square ' + props.background}
      onClick={() => changeSelectedPeice(row, col)}
    >
      {
        row <= 1 ? <div className={'redPeice ' + selected}></div> : row >= n -2 ? <div className={'blackPeice ' + selected}></div> : null
      }

    </div>
  )
}

export default Square