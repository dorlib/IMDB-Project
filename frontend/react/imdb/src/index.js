import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import { createHttpLink} from "@apollo/client";

import "./index.css";
import App from "./App";
import { FavoritesContextProvider } from "./store/favorites-context";


const client = new ApolloClient({
    uri: 'http://localhost:8081/query',
    cache: new InMemoryCache(),
    
});

ReactDOM.render(
  <FavoritesContextProvider>
      <ApolloProvider client ={client}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </ApolloProvider>
  </FavoritesContextProvider>,
  document.getElementById("root")
);
