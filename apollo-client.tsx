import { ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import React from 'react';
import {createUploadLink} from "apollo-upload-client";
//const { createUploadLink } = require('apollo-upload-client')
//import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
    uri: "http://0.0.0.0:8000/graphql",
    cache: new InMemoryCache(),
    link: createUploadLink(),
});

export default client;