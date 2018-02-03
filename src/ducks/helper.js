/**
 * Creates a reducer from an initial state and a handler function.
 * @param {object} initialState
 * @param {object} handlers - handler function which returns an object
 * @example state => ({ SET_NAME: name => ({...state, name}) })
 */
export function createReducer(initialState, handlers) {
  return (state = initialState, action) =>
    handlers(state)[action.type]
      ? handlers(state)[action.type](action.payload)
      : state
}

/**
 * Creates an action creator.
 * Will also put each arguments into the payload, if any.
 * @param {string} type - action type
 * @param {...string} [argNames] - action argument names
 * @return {function} Returns the Action Creator Function
 */
export function Creator(type, ...argNames) {
  if (argNames.length > 0) {
    return (...args) => {
      const payload = {}
      argNames.forEach((arg, index) => {
        payload[argNames[index]] = args[index]
      })
      return {type, payload}
    }
  }
  return payload => (payload ? {type, payload} : {type})
}
