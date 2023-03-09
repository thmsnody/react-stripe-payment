export default function Home({ cartProducts, setcartProducts }) {
  function addOne(item) {
    setcartProducts(
      cartProducts.map((x) => {
        if (x.item === item.item) {
          ++x.qty
        }
        return x
      })
    )
  }

  function removeOne(item) {
    setcartProducts(
      cartProducts.map((x) => {
        if (x.item === item.item) {
          x.qty > 0 ? --x.qty : (x.qty = 0)
        }
        return x
      })
    )
  }

  function removeAll(item) {
    setcartProducts(
      cartProducts.map((x) => {
        if (x.item === item.item) {
          x.qty = 0
        }
        return x
      })
    )
  }

  return (
    <div className='Home'>
      {cartProducts?.map((x, i) => (
        <div className='item-box' key={i}>
          <img src={`/img/${x.item}.svg`} alt={x.item} />
          <div className='price'>$ {x.price}</div>
          {x.qty ? (
            <>
              <div className='count'>
                <button onClick={() => addOne(x)}>+</button>
                <span>{x.qty} In Cart</span>
                <button onClick={() => removeOne(x)}>-</button>
              </div>
              <button className='add-remove' onClick={() => removeAll(x)}>
                Remove From Cart
              </button>
            </>
          ) : (
            <button className='add-remove' onClick={() => addOne(x)}>
              Add To Cart
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
