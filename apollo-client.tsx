import React from 'react';
import {ApolloClient, ApolloLink, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import {setContext} from "@apollo/client/link/context";
import {useRouter} from "next/router";
import {onError} from "apollo-link-error";
import {concat, RequestHandler} from "apollo-link";
import {redirect} from "next/navigation";



const link = createUploadLink({
    uri: "http://0.0.0.0:8000/graphql"
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token')
    if (!token){
        window.location.replace('/Login')
    }
    console.log(22222)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            // eslint-disable-next-line no-console
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    }
    // eslint-disable-next-line no-console
    if (networkError) console.log(`[Network error]: ${networkError}`);
    window.location.replace('/Login')
});
const client = new ApolloClient({
    cache: new InMemoryCache(),
    // @ts-ignore
    link:  authLink.concat(errorLink).concat(link),
});


export default client;