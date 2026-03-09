const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - using body-parser (deprecated in Express 5, use express.json() instead)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: '2024-02-20' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', createdAt: '2024-03-10' }
];

// Routes

// GET all users
app.get('/api/users', (req, res) => {
  // Using lodash (outdated version)
  const sortedUsers = _.sortBy(users, 'name');
  res.json({
    success: true,
    count: sortedUsers.length,
    data: sortedUsers
  });
});

// GET user by ID - Express 4 style with callback
app.get('/api/users/:id', (req, res) => {
  const user = _.find(users, { id: parseInt(req.params.id) });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  // Using moment (outdated version) to format date
  const formattedUser = {
    ...user,
    createdAtFormatted: moment(user.createdAt).format('MMMM Do, YYYY'),
    createdAtRelative: moment(user.createdAt).fromNow()
  };

  res.json({
    success: true,
    data: formattedUser
  });
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Please provide name and email'
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    createdAt: moment().format('YYYY-MM-DD')
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser
  });
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = _.findIndex(users, { id: userId });

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  // Using lodash merge (potential breaking change scenario)
  users[userIndex] = _.merge(users[userIndex], req.body);

  res.json({
    success: true,
    data: users[userIndex]
  });
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = _.findIndex(users, { id: userId });

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  // Using lodash remove
  _.remove(users, { id: userId });

  res.json({
    success: true,
    message: 'User deleted'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: moment().toISOString(),
    nodeVersion: process.version,
    expressVersion: require('express/package.json').version
  });
});

// Error handling middleware (Express 4 style - signature changes in Express 5)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Node version: ${process.version}`);
  console.log(`Express version: ${require('express/package.json').version}`);
});

module.exports = app;
