import React from 'react'
import './Board.css'
import Square from './Square'


class Board extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      board: [],
      selectedPeice: []
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

  changeSelectedPeice = (row, col) => {
    this.setState({
      selectedPeice: [row, col]
    })
  }


  render() {

    const { board, selectedPeice } = this.state

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

                  return (
                    <Square
                      row={r}
                      col={c}
                      selectedPeice={selectedPeice}
                      changeSelectedPeice={this.changeSelectedPeice}
                      n={this.props.n}
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