import React from 'react';
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import {setContext} from "@apollo/client/link/context";
import {useRouter} from "next/router";
const link = createUploadLink({
    uri: "http://0.0.0.0:8000/graphql"
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
});

export default client;