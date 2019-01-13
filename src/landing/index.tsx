import React, {CSSProperties, Component} from 'react'
import styled from '@emotion/styled'
import {navigate} from '@reach/router'

import {Button} from '../ui-button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const Input = styled.input`
  background: #ffffff;
  border: none;
  border-bottom: 2px solid #555;
  padding: 0.3em 1em;
  font-size: 1.8em;
  font-weight: 300;
  outline: none;
  color: #333;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  width: 100%;
  max-width: 300px;

  text-align: center;

  &:hover {
    transform: scale(1.05);
  }
`

const Heading = styled.h1`
  font-weight: 300;
  font-size: 2.8em;
`

const buttonStyle: CSSProperties = {
  marginTop: '1.5em',
  fontWeight: 300
}

interface LandingProps {
  path: string
}

interface LandingState {
  user: string
}

export default class LandingPage extends Component<LandingProps, LandingState> {
  state = {
    user: ''
  }

  setUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({user: event.target.value})
  }

  onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.viewGarden(event.currentTarget.value)
    }
  }

  viewGarden = (user: string) => navigate('/' + user)

  render() {
    const {user} = this.state

    return (
      <Container>
        <Heading>Git Garden</Heading>

        <Input
          value={user}
          placeholder="GitHub Name"
          onKeyPress={this.onKeyPress}
          onChange={this.setUser}
        />

        <Button
          style={buttonStyle}
          onClick={() => this.viewGarden(user)}
          large
          primary
        >
          View Garden
        </Button>
      </Container>
    )
  }
}
