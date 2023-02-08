import React from 'react';
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
const link = createUploadLink({
    uri: "http://0.0.0.0:8000/graphql"
});
const client = new ApolloClient({
    //uri: "http://0.0.0.0:8000/graphql",
    cache: new InMemoryCache(),
    //link: createUploadLink(),
    link
});

export default client;