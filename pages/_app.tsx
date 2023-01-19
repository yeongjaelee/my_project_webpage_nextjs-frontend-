import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SideBar from "./components/SideBar";
import {CookiesProvider} from "react-cookie";
import {BrowserRouter} from "react-router-dom";

export default function App({ Component, pageProps }: AppProps) {
    return(
          <SideBar>
            <Component {...pageProps} />
          </SideBar>

  )
}


