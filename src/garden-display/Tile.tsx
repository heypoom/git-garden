import styled from '@emotion/styled'

import {X_POS, Y_POS} from '.'

const WIDTH = 4.8
const HEIGH = 4
const TREE_POS_X = -1
const TREE_POS_Y = -4.5

export interface TileProps {
  col: number
}

export function getCol(col: number, extra: number) {
  return `translate(${col * X_POS + extra - TREE_POS_X }em, ${col * -Y_POS + extra - TREE_POS_Y }em)`
}

export const Tile = styled.div`
  position: absolute;
  z-index: ${(props: TileProps) => 7 - props.col};

  width: ${WIDTH}em;
  height: ${HEIGH}em;

  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transform: ${(props: TileProps) => getCol(props.col, 0)} rotate(-30deg) skew(30deg, 0deg);

  &:hover {
    z-index: 50;
  }

  &:hover img {
    transform: translate(${TREE_POS_X}em, ${TREE_POS_Y - 1.2}em) skew(-30deg, 0deg) rotate(30deg) scale(1.3);
  }
`
