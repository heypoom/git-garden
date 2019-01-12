import React from 'react'
import styled from '@emotion/styled'
import {splitEvery} from 'ramda'

import {Week} from './Week'

import {Contribution} from '../store'

export const X_POS = 4
export const Y_POS = 2.7

interface SceneProps {
  index: number
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 35vw;
`

const Scene = styled.div`
  position: relative;
  transform: translateY(${(props: SceneProps) => props.index * 45 + 20}em);
  filter: drop-shadow(rgba(130, 231, 60, 0.6) 0px 0px 12px);
`

interface GardenProps {
  contributions: Contribution[][]
  select: (row: number, col: number) => void
}

export const GardenDisplay = ({contributions, select}: GardenProps) => (
  <Container>
    {splitEvery(7, contributions).map((weeks, index) => {
      return (
        <Scene key={index} index={index}>
          {weeks.map((week, row) => (
            <Week key={row} row={row} week={week} select={select} />
          ))}
        </Scene>
      )
    })}
  </Container>
)
