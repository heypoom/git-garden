import React, {Component} from 'react'

export default class NotFound extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const {ready} = this.state

    if (!ready) {
      this.setState({
        ready: true
      })
    }
  }

  render() {
    const {ready} = this.state

    if (!ready) {
      return <div>Loading... Please wait.</div>
    }

    return (
      <div>
        <h1>404 - Oh no's! We couldn't find that page :(</h1>
      </div>
    )
  }
}
