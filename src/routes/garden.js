import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {compose, lifecycle} from 'recompose'

import {fetchGarden} from '../ducks/app'

const Container = styled.div`
  padding: 1.8em;
`

const total = garden => garden.reduce((sum, acc) => sum + acc.count, 0)

const Scene = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

function getTile(count) {
  if (count === 0) {
    return require('../assets/0.svg')
  } else if (count >= 1 && count < 5) {
    return require('../assets/1.svg')
  } else if (count >= 5 && count < 10) {
    return require('../assets/2.svg')
  } else if (count >= 10 && count < 20) {
    return require('../assets/3.svg')
  } else if (count >= 20 && count < 30) {
    return require('../assets/4.svg')
  } else if (count >= 30 && count < 40) {
    return require('../assets/5.svg')
  } else if (count >= 40) {
    return require('../assets/6.svg')
  }
}

const Garden = ({garden, match: {params}}) => (
  <Container>
    <h1>Garden of {params.id}</h1>
    <h2>Total Contributions: {total(garden)}</h2>

    <Scene>
      {garden.map(tile => (
        <Tile key={tile.date}>
          <small>{tile.date}</small>
          <h2>{tile.count}</h2>
          <img src={getTile(tile.count)} />
        </Tile>
      ))}
    </Scene>
  </Container>
)

const mapStateToProps = state => ({
  garden: state.app.garden,
})

const enhance = compose(
  connect(mapStateToProps, {fetchGarden}),
  lifecycle({
    async componentWillMount() {
      const id = this.props.match.params.id

      await this.props.fetchGarden(id)
    },
  }),
)

export default enhance(Garden)
