

# Backend Setup

## .evn

```
GOOGLE_CLIENT_ID= ???
GOOGLE_CLIENT_SECRET= ???
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
FRONTEND_URL=http://localhost:3001


# Database Config
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=12345
```

## .backend/src/modules/auth/config/passport.config
```
// src/config/passport.config.ts
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          throw new Error('Google profile does not contain an email address');
        }

        const googleUser = {
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
          avatar: profile.photos?.[0]?.value, // Lấy URL hình ảnh từ Google profile
        };
        done(null, googleUser);
        
      } catch (error) {
        console.error('GoogleStrategy Error:', error);
        done(error as Error, undefined);
      }
    }
  )
);


passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

```

Happy coding!
