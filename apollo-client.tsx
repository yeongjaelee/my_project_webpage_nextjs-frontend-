import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from 'react';

const client = new ApolloClient({
    uri: "http://0.0.0.0:8000/graphql",
    cache: new InMemoryCache(),
});

export default client;