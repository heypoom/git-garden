import React from 'react'
import {styled} from '@emotion/core'
import {splitEvery} from 'ramda'

import {getTile} from './getTile'

const SIZE = 10

const X_POS = 4
const Y_POS = 2.7

function getRow(row) {
  return `translate(${row * X_POS}em, ${row * Y_POS}em)`
}

function getCol(col, extra) {
  return `translate(${col * X_POS + extra}em, ${col * -Y_POS + extra}em)`
}

const Scene = styled.div`
  position: relative;
  transform: translateY(${props => props.i * 45 + 20}em);
  filter: drop-shadow(rgba(130, 231, 60, 0.6) 0px 0px 12px);
`

const Row = styled.div`
  position: relative;
  z-index: ${props => props.row};

  transform: ${props => getRow(props.row)};
`

const Tile = styled.img`
  position: absolute;
  z-index: ${props => 7 - props.col};

  width: ${SIZE}em;
  height: ${SIZE}em;

  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transform: ${props => getCol(props.col, 0)};

  &:hover {
    z-index: 50;
    filter: drop-shadow(rgb(130, 231, 60) 0px 0px 12px);
    transform: ${props => getCol(props.col, -1.2)} scale(1.3);
  }
`

const Week = ({row, week, select}) => (
  <Row key={row} row={row}>
    {week.map((day, col) => (
      <Tile
        key={day.date}
        onMouseOver={() => select(row, col)}
        src={getTile(day.count)}
        col={col}
      />
    ))}
  </Row>
)

const Container = styled.div`
  transform: translateX(25%) scale(0.75);
`

const Garden = ({garden, select}) => (
  <Container>
    {splitEvery(7, garden).map((weeks, i) => {
      return (
        <Scene key={i} i={i}>
          {weeks.map((week, row) => (
            <Week key={row} row={row} week={week} select={select} />
          ))}
        </Scene>
      )
    })}
  </Container>
)

export default Garden
