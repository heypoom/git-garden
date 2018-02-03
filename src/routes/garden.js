import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {compose, lifecycle} from 'recompose'
import {createSelector} from 'reselect'

import {fetchGarden, select} from '../ducks/app'

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

const SIZE = 10
const SPACING = 3.3

function getRow(row) {
  if (row === 0) {
    // Ignore
  } else if (row % 2 === 0) {
    return `translate(0em, -${row * SPACING}em)`
  } else {
    return `translate(4em, -${row * SPACING}em)`
  }
}

const Scene = styled.div`
  position: relative;
`

const Week = styled.div`
  position: absolute;
  z-index: ${props => props.row};

  transform: ${props => getRow(props.row)};
`

const Count = styled.span`
  position: fixed;
  z-index: 200;
  display: flex;
  top: 0;
  padding: 1em;
  background: white;
  box-shadow: 0 1px 1.5px 1px rgba(0, 0, 0, 0.12);
  font-size: 1.4em;
`

function getPos({x, y}) {
  const tX = x * 8
  const tY = y * 6

  return `translate(${tX}em, ${tY}em)`
}

const TileImage = styled.img`
  position: absolute;
  z-index: ${props => 7 - props.x};

  width: ${SIZE}em;
  height: ${SIZE}em;

  cursor: pointer;
  transform: ${props => getPos(props)};

  &:hover {
    filter: drop-shadow(rgb(130, 231, 60) 0px 0px 12px);
    transform: ${props => getPos(props)} scale(1.12);
  }
`

const Title = styled.h1`
  text-align: center;
`

const SubTitle = styled.h2`
  text-align: center;
`

const Garden = ({garden, select, curr, match: {params}}) => (
  <Container>
    <Title>Garden of {params.id}</Title>
    <SubTitle>Total Contributions: {total(garden)}</SubTitle>

    <Count>
      <strong>{curr.count} Contributions</strong>
      &nbsp;on&nbsp;<strong>{curr.date}</strong>
    </Count>

    <Scene>
      {garden.map((week, row) => (
        <Week key={row} row={row}>
          {week.map((day, col) => (
            <TileImage
              key={day.date}
              onMouseOver={() => select(row, col)}
              src={getTile(day.count)}
              x={col}
              y={row}
            />
          ))}
        </Week>
      ))}
    </Scene>
  </Container>
)

const currSelector = createSelector(
  state => state.app.garden,
  state => state.app.cursor.row,
  state => state.app.cursor.col,
  (garden, row, col) => {
    if (garden[row]) {
      return garden[row][col]
    }
  },
)

const mapStateToProps = state => ({
  garden: state.app.garden,
  curr: currSelector(state),
})

const enhance = compose(
  connect(mapStateToProps, {fetchGarden, select}),
  lifecycle({
    async componentWillMount() {
      const id = this.props.match.params.id

      await this.props.fetchGarden(id)
    },
  }),
)

export default enhance(Garden)
