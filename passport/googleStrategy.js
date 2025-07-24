const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findUserByEmail, createUser } = require('../models/userModel');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let user = await findUserByEmail(email);

    if (!user) {
      const userObj = {
        created_by: null,
        email,
        password_hash: '', // empty as password is not used here
        role: 'user',
        name: profile.displayName,
        dob: null,
        gender: null,
        blood_group: null,
      };
      const userId = await createUser(userObj);
      user = await findUserByEmail(email);
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, user[0]);
});
