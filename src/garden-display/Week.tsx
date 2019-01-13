import React from 'react'

import {Row} from './Row'
import {Tile} from './Tile'

import {getTile} from './getTile'
import {Contribution} from '../store'

export interface WeekProps {
  row: number
  week: Contribution[]
  select: (row: number, col: number) => void
}

export const Week = ({row, week, select}: WeekProps) => (
  <Row key={row} row={row}>
    {week.map((contribution, col) => (
      <Tile
        key={col}
        onMouseOver={() => select(row, col)}
        src={getTile(contribution.count)}
        col={col}
      />
    ))}
  </Row>
)
