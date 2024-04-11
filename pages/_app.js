import "../styles/globals.css";
import Layout from "@/layout/Layout";
import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider, getSession } from "next-auth/react";
import store from "@/redux/app/store";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/Loading";
// import Providers from "@/redux/Provider";

export default function App({ Component, pageProps }) {
  const [mode, setMode] = useState("light");
  const router = useRouter();

  const toggleTheme = () => {
    setMode(mode === "dark" ? "light" : "dark");

    localStorage.setItem("theme", mode === "dark" ? "light" : "dark");
  };

  const getDesignTokens = () => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            // primary: { main: "#e10000" },
            navbar: { main: "#e10000" },

            primary: { main: "#1976D2" },
            secondary: {
              main: "#e10000",
            },
            error: { main: "#e10000" },
            dateInputColor: {
              main: "#000",
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: "#1976D2",
            },
            secondary: {
              main: "#300000",
            },
            error: { main: "#e10000" },
            toggleBtn: { main: "#008000" },
            dateInputColor: {
              main: "#fff",
            },
          }),
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    const x = localStorage.getItem("theme");
    setMode(x ? x : "light");
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Loading />
        <SessionProvider session={pageProps.session}>
          {router.pathname.includes("login") && <Component {...pageProps} />}
          {!router.pathname.includes("login") && (
            <Layout toggleTheme={toggleTheme}>
              <Component {...pageProps} />
            </Layout>
          )}
          <ToastContainer />
        </SessionProvider>
        <CssBaseline />
      </ThemeProvider>
    </Provider>
  );
}
