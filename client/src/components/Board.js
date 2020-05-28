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

    const localBoard = window.localStorage.getItem('board')

    if (localBoard) {
      this.setState({
        board: JSON.parse(localBoard)
      })
    } else {
      this.setBoard(this.props.n)

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
          rowArr.push([''])
        }
      }
      array.push(rowArr)
    }

    this.setState({
      board: array
    })

  }

  clearSuggestions = () => {
    return this.state.board.slice().map(row => {
      return row.map(square => {
        if (square[0] === 'suggested') {
          return ['']
        } else {
          return square
        }
      })
    });
  }


  changeSelectedPeice = (type, row, col) => {
    const suggestions = []

    if (!type.length) return

    const board = this.clearSuggestions()


    if (type === 'redPeice' && row + 1 <= board.length) {

      if (col - 1 >= 0) {
        if (board[row + 1][col - 1]) {
          if (!board[row + 1][col - 1][0].length) {
            suggestions.push([row + 1, col - 1])
          }
        }
      }

      if (col + 1 < board[row].length && !board[row + 1][col +1][0].length) {
        suggestions.push([row + 1, col + 1])
      }
    }

    if (type === 'blackPeice' && row - 1 >= 0 && col - 1 >= 0) {

      if (!board[row - 1][col - 1][0]) {
        if (!board[row - 1][col - 1][0].length) {
          suggestions.push([row - 1, col -1])
        }

      }

      if (col + 1 < board[row].length && !board[row - 1][col + 1][0].length) {
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

  movePeice = (row, col, suggestedRow, suggestedCol) => {
    const boardCopy = this.clearSuggestions()

    var toMove = boardCopy[row][col]
    boardCopy[row][col] = ['']
    boardCopy[suggestedRow][suggestedCol] = toMove

    this.setState({
      board: boardCopy,
    })
  }

  saveOrResetGame = (type) => {
    const { board } = this.state
    if (type === 'save') {
      window.localStorage.setItem('board', JSON.stringify(board))
    } else {
      this.setBoard(this.props.n)
      window.localStorage.removeItem('board')
    }
  }



  render() {

    const { board, selectedPeice, suggestedPeices } = this.state

    return (
      <div>
        <button onClick={this.props.toggle}>Set Matrix</button>
        <button
          onClick={() => this.saveOrResetGame('save')}>
          Save Game
        </button>
        <button onClick={() => this.saveOrResetGame('other')}>Reset Game</button>
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
                      background={background}
                      suggested={suggested}
                      movePeice={this.movePeice}
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