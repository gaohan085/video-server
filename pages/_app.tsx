import type { AppProps } from "next/app";
import GlobalStyle from "../components/globalstyles";
import localFont from "next/font/local";
import { Provider } from "react-redux";
import store from "../src/store";
import { DefaultTheme, ThemeProvider } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

const myfont = localFont({
  src: "../public/Proxima Nova Font.otf",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <main className={myfont.className}>
            <Component {...pageProps} />
          </main>
        </Provider>
      </ThemeProvider>
    </>
  );
}
