import React from 'react'

const ProductCardContext = React.createContext()

//Hook
function useProductCard() {
  const context = React.useContext(ProductCardContext)
  if (!context) {
    throw new Error('useProductCard must be used within a ProductCardProvider')
  }
  return context
}

//Parent component
export function ProductCard({
  value,
  initialValue = 0,
  onIncrement,
  onDecrement,
  ...props
}) {
  if (value && !onIncrement && !onDecrement) {
    throw new Error(
      'if value is passed, onIncrement and onDecrement must be passed as well',
    )
  }

  const [counter, setCounter] = React.useState(initialValue)
  return (
    <ProductCardContext.Provider
      value={{onIncrement, onDecrement, counter, setCounter, value}}
    >
      <div
        className="w-full max-w-[264px] rounded-lg overflow-hidden border relative"
        {...props}
      >
        {props.children}
      </div>
    </ProductCardContext.Provider>
  )
}

//Child components
export function ProductCardTitle({title}) {
  return (
    <div className="px-4 my-2">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  )
}
export function ProductCardImage({path, title}) {
  return (
    <div className="w-full h-0 overflow-hidden relative pb-[56.25%]">
      <img
        src={path}
        alt={title}
        className="absolute w-full h-full object-cover"
      />
    </div>
  )
}
export function ProductCardHandler({by = 1}) {
  const {onIncrement, onDecrement, counter, setCounter, value} =
    useProductCard()

  const handleIncrement = () => {
    if (value || value === 0) {
      onIncrement(by)
    } else {
      const newValue = counter + by
      setCounter(newValue)
      onIncrement?.(newValue)
    }
  }
  const handleDecrement = () => {
    if (value) {
      onDecrement(by)
    } else {
      if (counter === 0) return
      const newValue = counter - by
      setCounter(newValue)
      onDecrement?.(newValue)
    }
  }
  return (
    <div className="px-4 mt-2 mb-4">
      <div className="border py-1 px-2 inline-flex rounded-lg text-lg font-bold">
        <button className="px-3 text-red-500" onClick={handleDecrement}>
          -
        </button>
        <span className="text-red-700">{value ?? counter}</span>
        <button className="px-3 text-red-500" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  )
}
