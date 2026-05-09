const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// ================= TEMP DATA =================

let products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Shoes", price: 120 }
]

let orders = []

// ================= ROUTES =================

// HOME
app.get("/", (req, res) => {
  res.json({ message: "API running" })
})

// PRODUCTS
app.get("/products", (req, res) => {
  res.json(products)
})

// ORDERS
app.get("/orders", (req, res) => {
  res.json(orders)
})

// CREATE ORDER
app.post("/orders", (req, res) => {

  const newOrder = {
    id: orders.length + 1,
    items: req.body.items || []
  }

  orders.push(newOrder)

  res.json(newOrder)
})

module.exports = app