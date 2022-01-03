import {
  ProductCard,
  ProductCardHandler,
  ProductCardImage,
  ProductCardTitle,
} from '.'
import {useCounter} from './hook'

//Using custom hook with useCounter control props pattern (as a wrapper)
export function ProductItem({
  value: controlledValue,
  onIncrement,
  onDecrement,
  product,
  by,
}) {
  const {value, getCounterProps} = useCounter({
    value: controlledValue,
    onIncrement,
    onDecrement,
  })
  //using prop getters to pass props to ProductCard
  const props = getCounterProps({value})
  return (
    <ProductCard key={product.id} {...props}>
      <ProductCardImage path={product.image} title={product.title} />
      <ProductCardTitle title={product.title} />
      <ProductCardHandler by={by} />
    </ProductCard>
  )
}
