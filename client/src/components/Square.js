import React from 'react'
import './Square.css'


const Square = (props) => {
  const { row, col, n, selectedPeice, changeSelectedPeice, peiceType, suggested } = props

  const selected = selectedPeice[0] === row && selectedPeice[1] === col ? 'selected' : ''

  return (
    <div
      className={'square ' + props.background}
      onClick={() => changeSelectedPeice(peiceType.trim(), row, col)}
    >

      {
        suggested ? <div className='suggested'></div>
        :
        <div className={peiceType + selected}></div>
      }
    </div>
  )
}

export default Square