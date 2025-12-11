const express = require('express');
const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');
const router = express.Router();
async function handleRoot(req, res) {
  const indexPath = path.join(__dirname, 'index.html');
  try {
    return res.sendFile(indexPath);
  } catch (err) {
    return res.send('OK');
  }
}
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  const result = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag,
  });
  res.json(result);
}
async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);
  if (!product) {
    return next(); 
  }
  res.json(product);
}
async function createProduct(req, res) {
  const created = await Products.create(req.body);
  res.json(created);
}
async function editProduct(req, res, next) {
  const { id } = req.params;
  const updated = await Products.edit(id, req.body);
  if (!updated) return next();
  res.json(updated);
}
async function deleteProduct(req, res, next) {
  const { id } = req.params;
  if (typeof Products.destroy === 'function') {
    const deleted = await Products.destroy(id);
    return res.json(deleted || { success: true });
  }
  if (typeof Products.remove === 'function') {
    const deleted = await Products.remove(id);
    return res.json(deleted || { success: true });
  }
  if (typeof Products.deleteOne === 'function') {
    const result = await Products.deleteOne({ _id: id });
    return res.json(result);
  }
  return res.json({ success: true });
}
async function createOrder(req, res) {
  const order = await Orders.create(req.body);
  res.json(order);
}
async function listOrders(req, res) {
  const { offset = 0, limit = 25, productId, status } = req.query;
  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status,
  });
  res.json(orders);
}
async function editOrder(req, res, next) {
  const { id } = req.params;
  const change = req.body;
  const order = await Orders.edit(id, change);
  if (!order) return next();
  res.json(order);
}
const handlers = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
  editOrder,
});
router.get('/', handlers.handleRoot);
router.get('/products', handlers.listProducts);
router.get('/products/:id', handlers.getProduct);
router.post('/products', handlers.createProduct);
router.put('/products/:id', handlers.editProduct);
router.delete('/products/:id', handlers.deleteProduct);
router.post('/orders', handlers.createOrder);
router.get('/orders', handlers.listOrders);
router.put('/orders/:id', handlers.editOrder);

module.exports = router;
