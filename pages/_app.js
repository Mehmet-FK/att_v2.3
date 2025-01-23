import "../styles/globals.css";

import Layout from "@/layout";
import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider, getSession } from "next-auth/react";
import store from "@/redux/app/store";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/ui-components/Loading";
import SessionHandler from "@/components/handlers/SessionHandler";
import SessionExpiredModal from "@/components/ui-components/SessionExpiredModal";
// import Providers from "@/redux/Provider";

function isFunction(func) {
  return Object.prototype.toString.call(func) === "[object Function]";
}

/**
 * This function converts an array to hash map
 * @param {String | function} key describes the key to be evaluated in each object to use as key for hashmap
 * @returns Object
 * @Example
 *      [{id:123, name:'atina'}, {id:345, name:"development"}].toHashMap("id")
 *      Returns :- Object {123: Object, 345: Object}
 */
Array.prototype.toHashMap = function (key) {
  var _hashMap = {},
    getKey = isFunction(key)
      ? key
      : function (_obj) {
          return _obj[key];
        };
  this.forEach(function (obj) {
    _hashMap[getKey(obj)] = obj;
  });
  return _hashMap;
};

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
    components: {
      MuiInputLabel: {
        defaultProps: {
          sx: {
            "&.MuiInputLabel-shrink": {
              top: "3px",
            },
          },
        },
        styleOverrides: {
          root: {
            fontSize: "0.7rem",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: "0.7rem",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            fontSize: "0.7rem",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "0.7rem",
          },
        },
      },
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
        <SessionProvider
          session={pageProps.session}
          // refetchInterval={13 * 60}
        >
          <SessionHandler />
          <SessionExpiredModal />
          {router.pathname.includes("login") && <Component {...pageProps} />}
          {!router.pathname.includes("login") && <Loading />}
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
