import styled from '@emotion/styled'

import {X_POS, Y_POS} from '.'

const SIZE = 10

export interface TileProps {
  col: number
}

export function getCol(col: number, extra: number) {
  return `translate(${col * X_POS + extra}em, ${col * -Y_POS + extra}em)`
}

export const Tile = styled.img`
  position: absolute;
  z-index: ${(props: TileProps) => 7 - props.col};

  width: ${SIZE}em;
  height: ${SIZE}em;

  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transform: ${(props: TileProps) => getCol(props.col, 0)};

  &:hover {
    z-index: 50;
    filter: drop-shadow(rgb(130, 231, 60) 0px 0px 12px);
    transform: ${(props: TileProps) => getCol(props.col, -1.2)} scale(1.3);
  }
`
