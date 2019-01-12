import styled from '@emotion/styled'

import {X_POS, Y_POS} from '.'

interface RowProps {
  row: number
}

export const Row = styled.div`
  position: relative;
  z-index: ${(props: RowProps) => props.row};
  transform: ${(props: RowProps) => getRow(props.row)};
`

function getRow(row: number) {
  return `translate(${row * X_POS}em, ${row * Y_POS}em)`
}
