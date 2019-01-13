import styled from '@emotion/styled'

import {X_POS, Y_POS} from '.'

const WIDTH = 4
const HEIGH = 3

export interface TileProps {
  col: number
}

export function getCol(col: number, extra: number) {
  return `translate(${col * X_POS + extra + 3 }em, ${col * -Y_POS + extra + 6 }em)`
}

export const Tile = styled.div`
  position: absolute;
  z-index: ${(props: TileProps) => 7 - props.col};

  width: ${WIDTH}em;
  height: ${HEIGH}em;

  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transform: ${(props: TileProps) => getCol(props.col, 0)};
  
  &:hover {
    z-index: 999;
  }

  &:hover img {
    transform: translate(-3em, -7.1em) scale(1.3);
  }
`
