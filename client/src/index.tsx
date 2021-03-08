import React from 'react';
import ReactDOM from 'react-dom';
import {
   ApolloClient,
   InMemoryCache,
   ApolloProvider
} from "@apollo/client";
import SongList from './components/SongList/SongList';
import { Router, hashHistory, Route, IndexRoute } from "react-router";
import App from './components/App';
import SongCreate from './components/SongCreate/SongCreate';
import "../style/style.css";

declare let module: any;

const client = new ApolloClient({
   uri: "http://localhost:4000/graphql",
   cache: new InMemoryCache()
});

const Root = (): JSX.Element => {
   return (
      <ApolloProvider client={client}>
         <Router history={hashHistory}>
            <Route path="/" component={App}>
               <IndexRoute component={SongList} />
               <Route path="songs/new" component={SongCreate} />
            </Route>
         </Router>
      </ApolloProvider>
   );
};

ReactDOM.render(
   <Root />,
   document.querySelector('#root')
);

// This is a workaround for a hot reload issue.
if (module.hot) {
   module.hot.accept();
}