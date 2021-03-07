import React from 'react';
import ReactDOM from 'react-dom';
import {
   ApolloClient,
   InMemoryCache,
   ApolloProvider
} from "@apollo/client";
import SongList from './components/SongList/SongList';
declare let module: any;

const client = new ApolloClient({
   uri: "http://localhost:4000/graphql",
   cache: new InMemoryCache()
});

const Root = (): JSX.Element => {
   return (
      <ApolloProvider client={client}>
         <SongList />
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