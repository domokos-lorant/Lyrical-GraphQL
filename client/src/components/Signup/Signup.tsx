import React, { useCallback, useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import { CurrentUserDocument } from "../Header/__generated__/currentUser.query.generated";
import { ApolloError } from "@apollo/client";
import { useSignupMutation } from "./__generated__/signup.mutation.generated";
import { hashHistory } from "react-router";

export default function Signup(): JSX.Element {
   const [signup] = useSignupMutation();
   const [errors, setErrors] = useState<string[]>([]);
   const onSubmit = useCallback(async (email: string, password: string) => {
      setErrors([]);

      try {
         await signup({
            variables: {
               email,
               password,
            },
            refetchQueries: [{ query: CurrentUserDocument }],
            awaitRefetchQueries: true
         });
         hashHistory.push("/");
      } catch (error) {
         const apolloError = error as ApolloError;
         const errors = apolloError.graphQLErrors.map(error => error.message);
         setErrors(errors);
      }
   }, [signup]);

   return (
      <div>
         <h3>Sign Up</h3>
         <AuthForm onSubmit={onSubmit} errors={errors} />
      </div>
   );
}