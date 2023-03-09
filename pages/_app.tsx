import type { AppProps } from "next/app";
import { fetcher } from "../src/hooks";
import GlobalStyle from "../components/globalstyles";
import localFont from "next/font/local";
import { Provider } from "react-redux";
import store from "../src/store";
import { SWRConfig } from "swr";
import { DefaultTheme, ThemeProvider } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

const myfont = localFont({
  src: "../public/Roboto-Regular.ttf",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <main className={myfont.className}>
            <SWRConfig
              value={{
                refreshInterval: 50000,
                fetcher: fetcher,
                revalidateOnFocus: false,
              }}
            >
              <Component {...pageProps} />
            </SWRConfig>
          </main>
        </Provider>
      </ThemeProvider>
    </>
  );
}
