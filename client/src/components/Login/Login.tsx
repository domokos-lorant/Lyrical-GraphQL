import React, { useCallback, useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useLoginMutation } from "./__generated__/login.mutation.generated";
import { CurrentUserDocument } from "../Header/__generated__/currentUser.query.generated";
import { ApolloError } from "@apollo/client";
import { hashHistory } from "react-router";

export default function Login(): JSX.Element {
   const [login] = useLoginMutation();
   const [errors, setErrors] = useState<string[]>([]);
   const onSubmit = useCallback(async (email: string, password: string) => {
      setErrors([]);

      try {
         await login({
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
   }, [login]);

   return (
      <div>
         <h3>Login</h3>
         <AuthForm onSubmit={onSubmit} errors={errors} />
      </div>
   );
}