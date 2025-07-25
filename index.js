const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const classRoutes = require('./routes/classRoutes');
require('./passport/googleStrategy');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/classes', classRoutes);
// Protected example route
const verifyToken = require('./middleware/jwtAuth');
app.get('/profile', verifyToken, (req, res) => {
  res.send(`Hello ${req.user.email}, your role is ${req.user.role}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
