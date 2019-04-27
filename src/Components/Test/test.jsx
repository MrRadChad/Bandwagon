import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {incrementCounter, decrementCounter} from './testActions'

const mappedState = (state) => ({
    data: state.test.data
})

const actions = {
    incrementCounter,
    decrementCounter
}

class Test extends Component {
  render() {
      const {incrementCounter, decrementCounter, data} = this.props
    return (
      <div>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color='green' content='Add 1' />
        <Button onClick={decrementCounter} color='red' content='Minus 1' />
      </div>
    )
  }
}

export default connect(mappedState, actions)(Test)