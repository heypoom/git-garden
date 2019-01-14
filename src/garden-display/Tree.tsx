
import styled from '@emotion/styled'

const SIZE = 10
const TREE_POS_X = -1
const TREE_POS_Y = -4.5

export const Tree = styled.img`
    pointer-events: none;
    position: absolute;
    transform: none;
    transform: translate(${TREE_POS_X}em, ${TREE_POS_Y}em) skew(-30deg, 0deg) rotate(30deg);
    width: ${SIZE}em;
    height: ${SIZE}em;
`