import React from 'react'
import {ProductItem} from './Item'

export function ProductItemWithState({product, onChange, by}) {
  const [value, setValue] = React.useState(product.value ?? 0)

  //Custom event handler for increment value
  function handleIncrement(state) {
    if (state.value < 0) {
      return
    }
    onChange?.({...product, value: state.value})
    // setValue(state.value)
    // setValue(p => p + 1)
  }

  //Custom event handler for decrement value
  function handleDecrement(state) {
    if (state.value < 0) {
      return
    }
    onChange?.({...product, value: state.value})
    // setValue(state.value)
    // setValue(p => p - 1)
  }

  //Uses WrappedComponent to pass custom event handlers
  return (
    <ProductItem
      value={product.value ?? value}
      product={product}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      by={by}
    />
  )
}
