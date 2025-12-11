const cuid = require('cuid');
const db = require('./db'); 
const Schema = db.Schema || require('mongoose').Schema;


const OrderSchema = new Schema({
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{ type: String, required: true }],
  status: {
    type: String,
    enum: ['pending', 'created', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
}, { timestamps: true });

const Order = (() => {
  try {
    return db.model('Order');
  } catch (e) {
    return db.model('Order', OrderSchema);
  }
})();


async function list({ offset = 0, limit = 25 } = {}) {
  return Order.find({})
    .skip(offset)
    .limit(limit)
    .exec();
}


async function get(_id) {
  return Order.findById(_id).exec();
}
async function create(fields) {
  const doc = {
    buyerEmail: fields.buyerEmail,
    products: fields.products || [],
    status: fields.status || 'pending'
  };

  return Order.create(doc);
}
async function edit(_id, change) {
  return Order.findByIdAndUpdate(_id, change, { new: true }).exec();
}
async function destroy(_id) {
  return Order.findByIdAndDelete(_id).exec();
}

module.exports = {
  list,
  get,
  create,
  edit,
  destroy
};
