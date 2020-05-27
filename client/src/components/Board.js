import React from 'react'
import './Board.css'
import Square from './Square'


class Board extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nVal: 8,
      board: []
    }
  }

  componentDidMount() {
    const { nVal } = this.state
    this.setBoard(this.props.n)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.n !== this.props.n) {
      this.setBoard(prevProps.n)
    }
  }

  setBoard = (n) => {
    var array = [];

    for (var row = 0; row < n; row++) {
      var rowArr = []
      for (var col = 0; col < n; col++) {
        rowArr.push([])
      }
      array.push(rowArr)
    }

    this.setState({
      board: array
    })

  }


  render() {

    const { board } = this.state

    return (
      <div>

        {
          board.map((row, r) => (
            <div className='row'>
              {
                row.map((col, c) => {
                  const num = r + c;
                  let background = num % 2 === 0 ? 'black' : 'white'

                  return (
                    <Square
                      background={background}
                    />
                  )
                })
              }

            </div>
          ))
        }

      </div>
    )
  }
}

export default Board