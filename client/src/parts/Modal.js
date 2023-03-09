export default function Modal({ cartProducts, modalShow, setmodalShow }) {
  function onClickCheckout() {
    const formData = cartProducts.filter((x) => x.qty !== 0)
    fetch(`${process.env.REACT_APP_SERVER_PORT}/checkout-a`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.url) {
          window.location.assign(res.url)
        }
      })
  }

  return (
    <div className={`Modal ${modalShow && 'show'}`}>
      <div className='click-to-close' onClick={() => setmodalShow(false)}></div>
      <div className='items-box'>
        <button className='close' onClick={() => setmodalShow(false)}>
          X
        </button>
        {cartProducts.reduce((acc, x) => acc + x.qty, 0) ? (
          <>
            {cartProducts?.map(
              (x, i) =>
                !!x.qty && (
                  <div className='item-box' key={i}>
                    <img src={`/img/${x.item}.svg`} alt={x.item} />
                    <div className='price'>{x.price}</div>
                    <div className=''>x</div>
                    <div className='qty'>{x.qty}</div>
                    <div className=''>=</div>
                    <div className=''>{x.price * x.qty}</div>
                  </div>
                )
            )}
            <hr />
            <div className='total-box'>
              <div className=''>Total</div>
              <div className='total'>
                $ {cartProducts.reduce((acc, x) => acc + x.price * x.qty, 0)}
              </div>
            </div>
            <button
              className='continue-to-checkout'
              onClick={() => onClickCheckout()}
            >
              Continue to checkout
            </button>
          </>
        ) : (
          <div className='no-items'>No items in your cart</div>
        )}
      </div>
    </div>
  )
}
