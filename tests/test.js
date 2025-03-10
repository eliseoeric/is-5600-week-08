// user.test.js
jest.mock('/workspaces/is-5600-week-08/tests/test.js', () => ({
    create: jest.fn(), // Mock create method
    findOne: jest.fn(), // Mock findOne method (if needed in other tests)
  }));
  
  const User = require('./workspaces/is-5600-week-08/tests/test.js');
  
  describe('User Model', () => {
    it('should create a new user', async () => {
      User.create.mockResolvedValue({ id: 1, username: 'testuser' });
  
      const user = await User.create({ username: 'testuser', password: 'password123' });
  
      expect(user).toHaveProperty('id');
      expect(user.username).toBe('testuser');
    });
  });
  