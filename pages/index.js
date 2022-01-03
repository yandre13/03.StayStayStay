import React from 'react'
import {
  ProductCard,
  ProductCardHandler,
  ProductCardImage,
  ProductCardTitle,
} from '../src/components/ProductCard'
import {ProductItem} from '../src/components/ProductCard/Item'
import {ProductItemWithState} from '../src/components/ProductCard/StateItem'

const dataMock = [
  {
    id: 1,
    title: 'Stay Stay Stay',
    image: '/img/img1.jpg',
    value: 0,
  },
  {
    id: 2,
    title: 'I bet you think about me',
    image: '/img/img2.jpg',
    value: 0,
  },
]
export default function Home() {
  const [data, setData] = React.useState(dataMock)
  const [state, setState] = React.useState([])

  const onChange = obj => {
    const newF = [...state, obj]
    const newState = [...new Map(newF.map(p => [p.id, p])).values()]
    const newData = [...data, obj]
    const newDataMap = [...new Map(newData.map(p => [p.id, p])).values()]
    // console.log(newState)
    // console.log(newDataMap)
    setData(newDataMap)
    setState(newState)
  }
  return (
    <div className="app flex flex-col items-center">
      <h1 className="text-4xl mb-10">Hello world</h1>
      {/*Mapping*/}
      <section className="flex gap-4">
        {data.map(product => (
          <ProductItemWithState
            key={product.id}
            product={product}
            onChange={onChange}
            by={5}
          />
        ))}
      </section>
      <br />
      <br />
      <section>{JSON.stringify(state, null, 2)}</section>
      {state?.map(product => (
        <ProductItemWithState
          key={product.id}
          product={product}
          onChange={onChange}
          by={5}
        />
      ))}
      <br />
      <br />
      <ProductCard initialValue={4}>
        <ProductCardImage path={dataMock[0].image} title={dataMock[0].title} />
        <ProductCardTitle title={dataMock[0].title} />
        <ProductCardHandler />
      </ProductCard>
      <br />
      <ProductItem
        product={dataMock[1]}
        onIncrement={e => console.log(e, 'ee')}
        // onDecrement={handleDecrement}
      />
    </div>
  )
}
