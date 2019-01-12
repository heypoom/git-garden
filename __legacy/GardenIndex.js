import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {createSelector} from 'reselect'

import Garden from '../src/garden-display'

const Container = styled.div``

const Count = styled.span`
  position: fixed;
  z-index: 200;
  display: flex;
  top: 0;
  padding: 1em;
  background: white;
  box-shadow: 0 1px 1.5px 1px rgba(0, 0, 0, 0.12);
  font-size: 1.4em;
`

const Title = styled.h1`
  margin: 0;
  padding-top: 1em;
  text-align: center;
`

const SubTitle = styled.h2`
  text-align: center;
`

const GardenView = ({total, curr, match: {params}}) => (
  <Container>
    <Title>Garden of {params.id}</Title>
    <SubTitle>Total Contributions: {total}</SubTitle>

    {curr && (
      <Count>
        <strong>{curr.count} Contributions</strong>
        &nbsp;on&nbsp;<strong>{curr.date}</strong>
      </Count>
    )}

    <Garden username={params.id} />
  </Container>
)

const currSelector = createSelector(
  state => state.app.garden,
  state => state.app.cursor.row,
  state => state.app.cursor.col,
  (garden, row, col) => {
    if (garden[row]) {
      return garden[row][col]
    }
  },
)

const totalSelector = createSelector(
  state => state.app.garden || [],
  garden =>
    garden
      .reduce((x, y) => [...x, ...y], [])
      .reduce((sum, acc) => sum + acc.count, 0),
)

const mapStateToProps = state => ({
  total: totalSelector(state),
  curr: currSelector(state),
})

const enhance = connect(mapStateToProps)

export default enhance(GardenView)
