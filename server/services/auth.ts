import { GraphQLLocalStrategy } from 'graphql-passport';
import passport from 'passport';
import { IVerifyOptions, VerifyFunction } from 'passport-local';
import { LyricalPassportContext } from '../../schema/LyricalPassportContext';
import { User } from "../models";
import { UserDocument } from '../models/user';

export function initializePassport(): void {
   // SerializeUser is used to provide some identifying token that can be saved
   // in the users session.  We traditionally use the 'ID' for this.
   passport.serializeUser<UserDocument, string>((user, done) => {
      // console.log(`Serializing ${JSON.stringify(user)}`);
      done(null, user.id);
   });

   // The counterpart of 'serializeUser'.  Given only a user's ID, we must return
   // the user object.  This object is placed on 'req.user'.
   passport.deserializeUser((id, done) => {
      //console.log(`Deserializing ${id}`);
      User.findById(id, null, null, (err, user) => {
         //console.log(`Deserialized user ${JSON.stringify(user)}`);
         done(err, user);
      });
   });

   // Instructs Passport how to authenticate a user using a locally saved email
   // and password combination.  This strategy is called whenever a user attempts to
   // log in.  We first find the user model in MongoDB that matches the submitted email,
   // then check to see if the provided password matches the saved password. There
   // are two obvious failure points here: the email might not exist in our DB or
   // the password might not match the saved one.  In either case, we call the 'done'
   // callback, including a string that messages why the authentication process failed.
   // This string is provided back to the GraphQL client.
   const verify: VerifyFunction = (
      email: string, 
      password: string, 
      done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
      // console.log("Verify executing");
      User.findOne({ email: email.toLowerCase() }, null, null, (err, user) => {
         if (err) {
            return done(err);
         }

         if (!user) {
            return done(null, false, { message: 'Invalid Credentials' });
         }

         user.comparePassword(password, (err, isMatch) => {
            if (err) {
               return done(err);
            }

            if (isMatch) {
               // console.log("IsMatch");
               return done(null, user);
            }

            return done(null, false, { message: 'Invalid Credentials' });
         });
      });
   };

   passport.use(new GraphQLLocalStrategy(verify as any));
}

type AuthArgs = {
   email: string;
   password: string;
   context: LyricalPassportContext
}

// Creates a new user account.  We first check to see if a user already exists
// with this email address to avoid making multiple accounts with identical addresses
// If it does not, we save the existing user.  After the user is created, it is
// provided to the passport login function.
export async function signup({ email, password, context }: AuthArgs) {
   const user = new User({ email, password });

   if (!email || !password) {
      throw new Error('You must provide an email and password.');
   }

   const existingUser = await User.findOne({ email });

   if (existingUser) {
      throw new Error('Email in use');
   }

   const newUser = await user.save();
   await context.login(newUser);
   return newUser;
}

export async function login({ email, password, context }: AuthArgs) {
   const { user } = await context.authenticate("graphql-local", {email, password});

   if (!user) {
      throw 'Invalid credentials.';
   }

   await context.login(user);
   return user;
}