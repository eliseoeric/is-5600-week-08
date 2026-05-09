const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')

// Boot the app
const app = express()

// Register the public directory
app.use(express.static(__dirname + '/public'));

// register the routes
app.use(bodyParser.json())
app.use(middleware.cors)

// Register root route
app.get('/', api.handleRoot)

// Register Products routes
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)

// Register Order Routes
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)
// edit and delete routes
app.put('/orders/:id', api.editOrder)

// Export the Express app for testing
module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`Server listening on port ${port}`))
}

