import React from 'react'
import Spinner from 'react-spinkit'
import styled from '@emotion/styled'

export const spinnerStyle = {
  width: '10em',
  height: '10em'
}

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

export function Loader() {
  return (
    <LoadingContainer>
      <Spinner style={spinnerStyle} name="cube-grid" color="#2B3D50" />
    </LoadingContainer>
  )
}
