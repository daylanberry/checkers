import React from 'react'
import './Board.css'
import Square from './Square'


class Board extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      board: [],
      selectedPeice: [],
      suggestedPeices: []
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
        if (row <= 1) {
          rowArr.push(['red'])
        } else if (row >= n - 2 && row <= n) {
          rowArr.push(['black'])
        } else {
          rowArr.push([])
        }
      }
      array.push(rowArr)
    }

    this.setState({
      board: array
    })

  }



  changeSelectedPeice = (type, row, col) => {
    const suggestions = []

    if (!type.length) return

    const board = this.state.board.slice().map(row => {
      return row.map(square => {
        if (square[0] === 'suggested') {
          return []
        } else {
          return square
        }
      })
    });


    if (type === 'redPeice' && row + 1 <= board.length) {

      if (col - 1 >= 0) {
        suggestions.push([row + 1, col - 1])
      }

      if (col + 1 < board[row].length) {
        suggestions.push([row + 1, col + 1])
      }
    }

    if (type === 'blackPeice' && row - 1 >= 0) {
      if (col - 1 >= 0){
        suggestions.push([row - 1, col -1])
      }

      if (col + 1 < board[row].length) {
        suggestions.push([row - 1, col + 1])
      }
    }

    suggestions.forEach((coord, i) => {
      const r = coord[0]
      const c = coord[1]

      board[r][c] = ['suggested']
    })

    this.setState({
      selectedPeice: [row, col],
      suggestedPeices: suggestions,
      board
    })
  }


  render() {

    const { board, selectedPeice, suggestedPeices } = this.state

    return (
      <div>
        <button onClick={this.props.toggle}>Set Matrix</button>
        {
          board.map((row, r) => (
            <div className='row'>
              {
                row.map((col, c) => {
                  const num = r + c;
                  let background = num % 2 === 0 ? 'black' : 'white'

                  let peiceType = board[r][c][0] === 'black' ? 'blackPeice ' : board[r][c][0] === 'red' ? 'redPeice ' : ''

                  let suggested = board[r][c][0] === 'suggested' ? true : false

                  return (
                    <Square
                      peiceType={peiceType}
                      row={r}
                      col={c}
                      selectedPeice={selectedPeice}
                      changeSelectedPeice={this.changeSelectedPeice}
                      n={this.props.n}
                      background={background}
                      suggested={suggested}
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