const express = require('express');
const api = require('./api');
const middleware = require('./middleware');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(middleware.cors);

// Routes
app.get('/', api.handleRoot);

// Product Routes
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);
app.post('/products', api.createProduct);

// Order Routes
app.get('/orders', api.listOrders);
app.post('/orders', api.createOrder);
app.put('/orders/:id', api.editOrder);

// Export app for testing
module.exports = app;

// Only start server outside test environment
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}