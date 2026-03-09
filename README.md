# Node.js 18 API with Express 4

THIS IS A POC TEST PROJECT

A sample Node.js API project designed for testing upgrade scenarios, particularly migrating from Express 4 to Express 5.

## Requirements

- Node.js 18.x (use `nvm use` to activate)
- npm

## Setup

```bash
nvm use
npm install
```

## Running the API

```bash
npm start
```

Server runs on `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check with version info |
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

## Outdated Dependencies

This project intentionally uses outdated packages to simulate upgrade scenarios:

| Package | Current | Purpose |
|---------|---------|---------|
| express | 4.18.2 | Web framework (v5 has breaking changes) |
| body-parser | 1.19.0 | Request parsing (deprecated in Express 5) |
| lodash | 4.17.15 | Utility library |
| moment | 2.29.1 | Date handling (deprecated) |

Run `npm outdated` to see available updates.

Run `npm audit` to see security vulnerabilities.

## Express 5 Migration Notes

When upgrading to Express 5, expect breaking changes:

- Replace `body-parser` with `express.json()` and `express.urlencoded()`
- Error handling middleware now supports async/await
- `req.query` is no longer a getter
- `app.del()` removed (use `app.delete()`)
- Removed `app.param(fn)` signature
- Path route matching changes
