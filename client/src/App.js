import React from 'react';
import Board from './components/Board'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      n: '',
      show: false
    }

  }

  handleChange = (e) => {
    const num = Number(e.target.value)
    this.setState({
      n: num
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({
      show: true
    })

  }



  render() {
    return (
      <div className="App">
        {
          this.state.show ? <Board n={this.state.n} /> : <form onSubmit={this.handleSubmit}>
          <label>
            Matrix N
          </label>
          <input
            type='text'
            value={this.state.n}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Add</button>
        </form>
        }
      </div>
    );

  }
}

export default App;
