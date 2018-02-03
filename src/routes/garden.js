import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'

import {fetchGarden} from '../ducks/app'

const Garden = ({match: {params}}) => (
  <div>
    <h1>Garden of {params.id}</h1>
  </div>
)

const mapStateToProps = state => ({
  garden: state.app.garden,
})

const enhance = compose(
  connect(mapStateToProps, {fetchGarden}),
  lifecycle({
    async componentWillMount() {
      const id = this.props.match.params.id

      await this.props.fetchGarden(id)
    },
  }),
)

export default enhance(Garden)
