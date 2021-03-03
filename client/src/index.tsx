import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
declare let module: any;

const client = new ApolloClient({});

const Root = (): JSX.Element => {
   return (
      <ApolloProvider client={client}>
         <div>Lyrical</div>
      </ApolloProvider>
   );
};

ReactDOM.render(
   <Root />,
   document.querySelector('#root')
);

if (module.hot) {
   module.hot.accept();
}