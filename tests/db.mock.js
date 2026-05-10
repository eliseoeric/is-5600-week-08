const mockProducts = [
  {
    _id: 'mock-product-1',
    description: 'Mock Product One',
    likes: 1,
    urls: {
      regular: 'https://example.com/regular.jpg',
      small: 'https://example.com/small.jpg',
      thumb: 'https://example.com/thumb.jpg'
    },
    links: {
      self: 'https://example.com/self',
      html: 'https://example.com/html'
    },
    user: {
      id: 'user1',
      first_name: 'Mock',
      last_name: 'User',
      username: 'mockuser'
    },
    tags: [{ title: 'mock' }]
  },
  {
    _id: 'mock-product-2',
    description: 'Mock Product Two',
    likes: 2,
    urls: {
      regular: 'https://example.com/regular2.jpg',
      small: 'https://example.com/small2.jpg',
      thumb: 'https://example.com/thumb2.jpg'
    },
    links: {
      self: 'https://example.com/self2',
      html: 'https://example.com/html2'
    },
    user: {
      id: 'user2',
      first_name: 'Mock2',
      last_name: 'User2',
      username: 'mockuser2'
    },
    tags: [{ title: 'mock2' }]
  }
]

const mockQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockProducts),
  then(resolve) {
    resolve(mockProducts)
  }
}

const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery)
}

const mockDb = {
  model: jest.fn().mockReturnValue(mockModel)
}

module.exports = {
  mockDb,
  mockProducts,
  mockModel,
  mockQuery
}
