import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from 'react';

const client = new ApolloClient({
    uri: "https://api.trippy.blocket.co.kr/graphql",
    cache: new InMemoryCache(),
});

export default client;