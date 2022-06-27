import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

import "./index.css";
import App from "./App";
import {FavoritesContextProvider} from "./favorites/favorites-context";
import {SnackbarProvider} from "notistack";


const client = new ApolloClient({
    uri: 'http://localhost:8081/query',
    cache: new InMemoryCache(),

});

ReactDOM.render(
    <FavoritesContextProvider>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <SnackbarProvider maxSnack={3}>
                    <App/>
                </SnackbarProvider>
            </BrowserRouter>
        </ApolloProvider>
    </FavoritesContextProvider>,
    document.getElementById("root")
);
