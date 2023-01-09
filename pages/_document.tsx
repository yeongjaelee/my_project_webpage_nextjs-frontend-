import { Html, Head, Main, NextScript } from 'next/document'
import {ApolloProvider} from "@apollo/client";
import client from "../apollo-client";

export default function Document() {
  return (
    <Html lang="en">
        <Head>
        <link href="https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/></Head>
      <body>
      <ApolloProvider client={client}>
          <Main />
          <NextScript />
      </ApolloProvider>
      </body>
    </Html>
  )
}
