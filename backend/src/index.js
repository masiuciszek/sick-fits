const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());
// @ts-ignore
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    // @ts-ignore
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // @ts-ignore
    req.userId = userId;
  }
  next();
});

// @ts-ignore
server.express.use(async (req, res, next) => {
  // @ts-ignore
  if (!req.userId) return next();
  const user = await db.query.user(
    // @ts-ignore
    { where: { id: req.userId } },
    // @ts-ignore
    '{ id, permissions, email, name }'
  );
  // @ts-ignore
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
