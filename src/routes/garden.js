import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {compose, lifecycle} from 'recompose'

import {fetchGarden} from '../ducks/app'

const Container = styled.div`
  padding: 1.8em;
`

const total = garden =>
  garden
    .reduce((x, y) => [...x, ...y], [])
    .reduce((sum, acc) => sum + acc.count, 0)

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

// display: flex;
// flex-direction: column-reverse;
// flex-wrap: wrap;
const Scene = styled.div`
  position: relative;
`

// display: flex;
// flex-direction: column;
// align-items: center;
// justify-content: center;
const Tile = styled.div``

function getRow(row) {
  if (row === 0) {
    // Ignore
  } else if (row % 2 === 0) {
    // 2: (0, -4)
    // 4: (0, -8)
    return `translate(0em, -${row * 2}em)`
  } else {
    return `translate(3em, -${row * 2}em)`
  }
}

// display: flex;
// justify-content: center;
const Week = styled.div`
  transform: ${props => getRow(props.row)};
`

const Count = styled.div``

function getPos({x, y}) {
  const tX = x * 6
  const tY = y * 4

  return `translate(${tX}em, ${tY}em)`
}

const TileImage = styled.img`
  position: absolute;

  width: 6em;
  height: 6em;

  transform: ${props => getPos(props)};

  &:hover {
    transform: ${props => getPos(props)} scale(1.12);
  }
`

const Title = styled.h1`
  text-align: center;
`

const SubTitle = styled.h2`
  text-align: center;
`

const Garden = ({garden, match: {params}}) => (
  <Container>
    <Title>Garden of {params.id}</Title>
    <SubTitle>Total Contributions: {total(garden)}</SubTitle>

    <Scene>
      {garden.map((week, row) => (
        <Week key={row} row={row}>
          {week.map((day, col) => (
            <Tile key={day.date}>
              <TileImage src={getTile(day.count)} x={col} y={row} />
            </Tile>
          ))}
        </Week>
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
