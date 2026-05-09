// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

// Validate product middleware
const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Product name is required' });
  }
  
  if (price === undefined || price < 0) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }
  
  if (!category || category.trim() === '') {
    return res.status(400).json({ error: 'Category is required' });
  }
  
  next();
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.status === 404) {
    return res.status(404).json({ error: err.message });
  }
  
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error' 
  });
};

module.exports = { logger, validateProduct, errorHandler };