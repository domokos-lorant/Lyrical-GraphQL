import passport from 'passport';
import { LyricalPassportContext } from '../../schema/LyricalPassportContext';
import { User } from "../models";

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