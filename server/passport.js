import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './model/UserModel.js';

// Load environment variables
dotenv.config();

// User serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// User deserialization
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.OAUTH_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback',
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          return done(null, user);
        }

        // Create new user if they don't exist
        // user = await User.create({
        //   email: profile.emails[0].value,
        //   firstName: profile.name.givenName,
        //   lastName: profile.name.familyName,
        //   googleId: profile.id,
        //   image: profile.photos[0].value,
        //   defaultProfile: false
        // });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;