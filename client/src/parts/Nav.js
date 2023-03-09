import { Link } from 'react-router-dom'

export default function Nav({ cartProducts, setmodalShow }) {
  return (
    <nav className='Nav'>
      <Link to='/' className='brand'>
        Simple Lunch
      </Link>
      <div className='cart' onClick={() => setmodalShow(true)}>
        Cart ({cartProducts.reduce((acc, x) => acc + x.qty, 0)} Items)
      </div>
    </nav>
  )
}
