import React, {Component} from 'react'

import {Loader} from '../ui-loader'

interface NotFoundProps {
  page?: string
}

interface State {
  ready: boolean
}

export default class NotFound extends Component<any, State> {
  state = {ready: false}

  componentDidMount() {
    this.setState({ready: true})
  }

  render() {
    const {ready} = this.state

    if (!ready) return <Loader />

    return (
      <div>
        <h1>404 - Oh no's! We couldn't find that page :(</h1>
      </div>
    )
  }
}
