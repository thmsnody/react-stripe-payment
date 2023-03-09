const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_KEY)
const path = require('path')

const app = express()
if (process.env.MODE !== 'pro') {
  app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json())

// Direct item and price
app.post('/checkout-a', async (req, res) => {
  let line_items = []
  req.body.formData.forEach((x) => {
    line_items.push({
      price_data: {
        currency: 'cad',
        product_data: {
          name: x.item,
        },
        unit_amount: x.price * 100,
      },
      quantity: +x.qty,
    })
  })
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `http://localhost:${
      MODE === 'pro' ? PORT : DEV_CLIENT_PORT
    }/success`,
    cancel_url: `http://localhost:${
      MODE === 'pro' ? PORT : DEV_CLIENT_PORT
    }/cancel`,
  })
  res.send(
    JSON.stringify({
      url: session.url,
    })
  )
})

// Product from stripe website
app.post('/checkout-b', async (req, res) => {
  let ids = {
    burger: 'price_1McZvpBwtrlujhmHptiIAXlX',
    sandwitch: 'price_1McZwHBwtrlujhmHN5TLZ4nU',
    pizza: 'price_1McZwTBwtrlujhmHZYdXMqIU',
    drink: 'price_1McZweBwtrlujhmHtmCTHVfR',
  }
  let line_items = []
  req.body.formData.forEach((x) => {
    line_items.push({
      price: ids[x.item],
      quantity: x.qty,
    })
  })
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:5012/success',
    cancel_url: 'http://localhost:5012/cancel',
  })
  res.send(
    JSON.stringify({
      url: session.url,
    })
  )
})

if (process.env.MODE === 'pro') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5012
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
