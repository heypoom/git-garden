import React from 'react'

import {Row} from './Row'
import {Tile} from './Tile'
import {Tree} from './Tree'

import {getTile} from './getTile'
import {Contribution} from '../store'

export interface WeekProps {
  row: number
  week: Contribution[]
  select: (date: Date) => void
}

export const Week = ({row, week, select}: WeekProps) => (
  <Row key={row} row={row}>
    {week.map((contribution, col) => (
      <Tile
        key={col}
        onMouseOver={() => select(contribution.date)}
        col={col}
      >
        <Tree    
          src={getTile(contribution.count)}
        />
      </Tile>
    ))}
  </Row>
)
