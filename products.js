const cuid = require('cuid')
const db = require('./db')

// Define our Product Model
const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: { type: String },
  alt_description: { type: String },
  likes: { type: Number, required: true },
  urls: {
    regular: { type: String, required: true },
    small: { type: String, required: true },
    thumb: { type: String, required: true },
  },
  links: {
    self: { type: String, required: true },
    html: { type: String, required: true },
  },
  user: {
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    portfolio_url: { type: String },
    username: { type: String, required: true },
  },
  tags: [{
    title: { type: String, required: true },
  }],
})

/**
 * List products
 * @param {*} options 
 * @returns 
 */
async function list(options = {}) {

  const { offset = 0, limit = 25, tag } = options;

  const query = tag ? {
    tags: {
      $elemMatch: {
        title: tag
      }
    }
  } : {}

  const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)

  return products
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(_id) {
  const product = await Product.findById(_id)
  return product
}

async function create(fields) {
  const product = await new Product(fields).save()
  return product
}

async function edit(_id, change) {
  const product = await get(_id)

  Object.keys(change).forEach(function(key) {
    product[key] = change[key]
  })

  await product.save()

  return product
}

async function destroy(_id) {
  return await Product.deleteOne({ _id })
}

module.exports = {
  list,
  create,
  edit,
  destroy,
  get
}
const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => mockDb);

describe('Products Module', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ LIST
  describe('list', () => {
    it('should return all products', async () => {
      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  // ✅ GET
  describe('get', () => {
    it('should get product by id', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({
        description: 'Product 1'
      });

      const product = await get('abc123');

      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  // ✅ DESTROY
  describe('destroy', () => {
    it('should delete a product', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({
        deletedCount: 1
      });

      const result = await destroy('abc123');

      expect(result.deletedCount).toBe(1);
    });
  });

});
