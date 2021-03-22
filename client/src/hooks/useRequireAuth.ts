import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { hashHistory } from "react-router";
import { useCurrentUserQuery } from "../components/Header/__generated__/currentUser.query.generated";

export default function useRequireAuth() {
   const { loading, data } = useCurrentUserQuery({
      fetchPolicy: "network-only",
   });
   const user = data?.user;

   console.log(user);

   if (!loading && !user) {
      hashHistory.push("/login");
   }
}