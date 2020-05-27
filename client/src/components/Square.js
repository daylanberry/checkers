import React from 'react'
import './Square.css'


const Square = (props) => {
  const { row, col, movePeice, selectedPeice, changeSelectedPeice, peiceType, suggested } = props

  const selectedRow = selectedPeice[0]
  const selectedCol = selectedPeice[1]

  const selected = selectedRow === row && selectedCol === col ? 'selected' : ''

  return (
    <div
      className={'square ' + props.background}
      onClick={() => changeSelectedPeice(peiceType.trim(), row, col)}
    >

      {
        suggested ? <div onClick={() => movePeice(selectedRow, selectedCol, row, col)} className='suggested'></div>
        :
        <div className={peiceType + selected}></div>
      }
    </div>
  )
}

export default Square