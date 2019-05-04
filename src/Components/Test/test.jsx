import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {incrementCounter, decrementCounter} from './testActions'
import {openModal} from '../../Modals/ModalActions'

const mappedState = (state) => ({
    data: ''
})

const actions = {
    incrementCounter,
    decrementCounter,
    openModal
}

class Test extends Component {

  render() {
      const {incrementCounter, decrementCounter, data, openModal} = this.props
    return (
      <div>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color='green' content='Add 1' />
        <Button onClick={decrementCounter} color='red' content='Minus 1' />
        <Button onClick={() => openModal('TestModal', {data: 45})} color='yellow' content='Open Modal' />
      </div>
    )
  }
}

export default connect(mappedState, actions)(Test)