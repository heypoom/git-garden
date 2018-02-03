import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {compose, lifecycle} from 'recompose'
import {splitEvery} from 'ramda'

import {fetchGarden, select} from '../ducks/app'

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

const X_POS = 4
const Y_POS = 2.5

function getRow(row) {
  return `translate(${row * X_POS}em, ${row * Y_POS}em)`
}

function getCol(x, y) {
  return `translate(${x * X_POS}em, ${x * -Y_POS}em)`
}

const Scene = styled.div`
  position: relative;
  transform: translateY(${props => props.i * 45 + 20}em);

  @media screen and (max-width: 480px) {
    transform: scale(0.4);
  }

  @media screen and (max-width: 800px) {
    transform: scale(0.8);
  }
`

const Row = styled.div`
  position: relative;
  z-index: ${props => props.row};

  transform: ${props => getRow(props.row)};
`

const Tile = styled.img`
  position: absolute;
  z-index: ${props => 7 - props.x};

  width: ${SIZE}em;
  height: ${SIZE}em;

  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transform: ${props => getCol(props.x, props.y)};

  &:hover {
    filter: drop-shadow(rgb(130, 231, 60) 0px 0px 12px);
    transform: ${props => getCol(props.x, props.y - 0.4)} scale(1.3);
  }
`

const Week = ({row, week, select}) => (
  <Row key={row} row={row}>
    {week.map((day, col) => (
      <Tile
        key={day.date}
        onMouseOver={() => select(row, col)}
        src={getTile(day.count)}
        x={col}
        y={row}
      />
    ))}
  </Row>
)

const Garden = ({garden, select}) => (
  <div>
    {splitEvery(7, garden).map((weeks, i) => {
      return (
        <Scene key={i} i={i}>
          {weeks.map((week, row) => (
            <Week key={row} row={row} week={week} select={select} />
          ))}
        </Scene>
      )
    })}
  </div>
)

const mapStateToProps = state => ({
  garden: state.app.garden,
})

const enhance = compose(
  connect(mapStateToProps, {fetchGarden, select}),
  lifecycle({
    async componentWillMount() {
      const id = this.props.username

      await this.props.fetchGarden(id)
    },
  }),
)

export default enhance(Garden)
