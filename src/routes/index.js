import React, {Component} from 'react'
import styled from 'react-emotion'
import {Head} from 'react-static'
import axios from 'axios'

import bgImage from '../assets/bg.jpg'

const siteRoot = 'https://noobdevth.firebaseapp.com'

const Backdrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  min-height: 100vh;

  background: #3d384e;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  margin: 2em;
  padding: 1.7em 2.5em;
  background: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`

const Heading = styled.h1`
  margin: 0;
  font-size: 1.5em;
  font-weight: 300;
  margin-bottom: 1em;

  color: white;
`

const Title = styled.h2`
  margin: 0;
  font-size: 1.8em;
  font-weight: 300;

  color: #333;
`

const Input = styled.input`
  font-family: Fira Mono, monospace;
  text-align: center;
  border: none;
  border-bottom: 2px solid #2c283d;
  padding: 0.3em 1em;
  font-size: 1.8em;
  background: #ffffff;
  font-weight: 300;
  outline: none;
  color: #333;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    transform: scale(1.1);
    border-bottom: 2px solid #895add;
  }
`

const Button = styled.button`
  color: #895add;
  background: white;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: Fira Mono, monospace;
  font-size: 1.2em;
  margin-top: 1.5em;
  outline: none;
  padding: 0.5em 0.8em;
  transition: 0.3s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    color: white;
    background: #333;
    transform: scale(1.1);
  }
`

const Paragraph = styled.p`
  margin: 0;
  margin-top: 1em;
  font-size: 1.15em;
  line-height: 1.55em;
  color: #555;
`

const Anchor = styled.a`
  color: ${props => (props.white ? '#d1bef0' : 'teal')};
  text-decoration: none;
  font-size: 1.18m;
`

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  opacity: ${props => (props.show ? 1 : 0)};

  text-align: center;
  width: 100%;
  padding: 0.4em;
  color: white;
  background: #333;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) all;
`

const Success = ({result: {state, avatar}}) => {
  if (state === 'active') {
    return (
      <Card>
        <Title>You have joined already.</Title>
        <Paragraph>
          Visit the Organization at{' '}
          <Anchor
            href="https://github.com/noobdevth"
            target="_blank"
            rel="noopener noreferrer">
            https://github.com/noobdevth
          </Anchor>.
        </Paragraph>
      </Card>
    )
  } else if (state === 'pending') {
    return (
      <Card>
        <Title>You are Invited!</Title>
        <Paragraph>
          Please visit{' '}
          <Anchor
            href="https://github.com/noobdevth"
            target="_blank"
            rel="noopener noreferrer">
            https://github.com/noobdevth
          </Anchor>{' '}
          to Accept the Invitation.
        </Paragraph>
      </Card>
    )
  }
}

const endpoint = 'https://us-central1-noobdevth.cloudfunctions.net/invite'

class Landing extends Component {
  state = {
    username: '',
    result: null,
    error: null,
    loading: false
  }

  set = e => this.setState({username: e.target.value})

  enter = e => e.key === 'Enter' && this.submit()

  submit = () => {
    this.setState({loading: true})

    axios
      .post(endpoint, {username: this.state.username})
      .then(({data}) => {
        this.setState({
          result: data,
          error: null,
          loading: false
        })
      })
      .catch(err => {
        console.warn(err)
        const error = err.response.data.error

        this.setState({
          error,
          result: null,
          loading: false
        })
      })
  }

  render() {
    const {username, result, loading, error} = this.state

    return (
      <Backdrop>
        <Head>
          <title>Join NoobProgrammer on GitHub</title>
          <meta
            name="description"
            content="Invite Yourself to the NoobProgrammer Thailand Organization on GitHub."
          />
          <meta property="og:image" content={siteRoot + bgImage} />
          <link
            href="https://fonts.googleapis.com/css?family=Fira+Mono"
            rel="stylesheet"
          />
        </Head>
        <Heading>
          Join{' '}
          <Anchor
            href="https://github.com/noobdevth"
            target="_blank"
            rel="noopener noreferrer"
            white>
            @noobdevth
          </Anchor>{' '}
          on GitHub
        </Heading>
        <Input
          placeholder="GitHub Username"
          onChange={this.set}
          onKeyPress={this.enter}
          value={username}
        />
        <Loading show={loading}>Inviting @{username} to NoobProgrammer</Loading>
        {result && <Success result={result} />}
        {error && <Card>Error: {error.message || error}</Card>}

        {!result &&
          !error && <Button onClick={this.submit}>Invite Yourself!</Button>}
      </Backdrop>
    )
  }
}

export default Landing
