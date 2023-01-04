import { Html, Head, Main, NextScript } from 'next/document'
import {ApolloProvider} from "@apollo/client";
import client from "../apollo-client";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
      <ApolloProvider client={client}>
          <Main />
          <NextScript />
      </ApolloProvider>
      </body>
    </Html>
  )
}
