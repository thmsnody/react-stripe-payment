const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
var cors = require('cors')
const stripe = require('stripe')('sk_test_EOnqx5VZPlIeCO2Rh3XusEOG00uYFu1BUU')

const app = express()
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json())

app.post('/checkout', async (req, res) => {
  const items = req.body.items
  let lineItems = []
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    })
  })

  //   const session = await stripe.checkout.sessions.create({
  //     line_items: lineItems,
  //     mode: 'payment',
  //     success_url: 'http://localhost:3000/success',
  //     cancel_url: 'http://localhost:3000/cancel',
  //   })
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: 'aabbaa',
          },
          unit_amount: 12345,
        },
        quantity: 2,
      },
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: 'aabbbb',
          },
          unit_amount: 23456,
        },
        quantity: 3,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  })
  res.send(
    JSON.stringify({
      url: session.url,
    })
  )
})

app.listen(4000, () => console.log('Listening on port 4000!'))
