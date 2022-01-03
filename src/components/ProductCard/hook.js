import React from 'react'

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn?.(...args))

const actionTypes = {
  increment: 'increment',
  decrement: 'decrement',
}
//reducer for API
function counterReducer(state, {type, by}) {
  switch (type) {
    case actionTypes.increment: {
      return {value: state.value + by}
    }
    case actionTypes.decrement: {
      return {value: state.value - by}
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

//Control Props
export function useCounter({
  initialValue = 0,
  reducer = counterReducer,
  onIncrement,
  onDecrement,
  value: controlledValue,
} = {}) {
  //Keep initial value with ref
  const {current: initialState} = React.useRef({value: initialValue})
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const valueIsControlled = controlledValue != null
  const value = valueIsControlled ? controlledValue : state.value

  //Control Props
  function dispatchWithOnIncrement(action) {
    if (!valueIsControlled) {
      dispatch(action)
    }
    //call reducer with some functions from the outside
    onIncrement?.(reducer({...state, value}, action), action)
  }
  function dispatchWithOnDecrement(action) {
    if (!valueIsControlled) {
      dispatch(action)
    }
    //call reducer with some functions from the outside
    onDecrement?.(reducer({...state, value}, action), action)
  }
  const increment = e =>
    dispatchWithOnIncrement({type: actionTypes.increment, by: e ?? 1})

  const decrement = e =>
    dispatchWithOnDecrement({type: actionTypes.decrement, by: e ?? 1})

  //use Prop getters pattern
  function getCounterProps({onIncrement, onDecrement, ...props} = {}) {
    return {
      onIncrement: callAll(onIncrement, increment),
      onDecrement: callAll(onDecrement, decrement),
      ...props,
    }
  }
  return {
    value,
    getCounterProps,
  }
}
