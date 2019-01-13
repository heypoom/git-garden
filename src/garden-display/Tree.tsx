
import styled from '@emotion/styled'

const SIZE = 10
const TREE_POS_X = -3
const TREE_POS_Y = -6 

export const Tree = styled.img`
    pointer-events: none;
    position: absolute;
    transform: translate(${TREE_POS_X}em, ${TREE_POS_Y}em);
    width: ${SIZE}em;
    height: ${SIZE}em;
`