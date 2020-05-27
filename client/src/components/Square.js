import React from 'react'
import './Square.css'


const Square = (props) => {
  const { row, n } = props

  return (
    <div className={'square ' + props.background}>
      {
        row <= 1 ? <div className='redPeice'></div> : row >= n -2 ? <div className='blackPeice'></div> : null
      }

    </div>
  )
}

export default Square