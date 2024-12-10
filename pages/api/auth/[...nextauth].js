// import { toastErrorNotify } from "@/helpers/ToastNotify";
import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const isTokenExpired = (token) => {
  if (!token) return false;
  const tokenParts = token.split(".");

  const payload = JSON.parse(
    atob(tokenParts[1].replace(/-/g, "+").replace(/_/g, "/"))
  );
  const exp = payload.exp; // exp is in seconds
  const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000); // Convert to seconds

  return exp < currentTimeInSeconds;
};

const logSessionUpdate = () => {
  const currentdate = new Date();
  const datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
};

const refreshAccessToken = async (accessTokenOld, refreshTokenOld) => {
  console.log("refreshToken triggered");
  console.log(logSessionUpdate());
  try {
    const { data } = await axios.post(
      "https://apl.attensam.at/atina/AtinaUsers/refresh",
      { accessToken: accessTokenOld, refreshToken: refreshTokenOld }
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export const authOptions = {
  // session: {
  //   strategy: "jwt",
  // },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { username, password } = credentials;
        try {
          const { data } = await axios.post(
            `https://pro.attensam.at/atina/AtinaUsers/login`,
            {
              username,
              password,
            }
          );
          return data;
        } catch (error) {
          let code = error?.response?.status || "";
          throw Error(code + " Etwas ist schiefgelaufen!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const datetime = logSessionUpdate();

      if (user) {
        console.log("First Login");
        console.log(datetime);

        return { ...token, ...user };
      }
      if (trigger === "update" && session?.user?.token) {
        console.log("Update after expiration");
        console.log(datetime);
        return {
          ...token,
          token: session.user.token,
          refreshToken: session.user.refreshToken,
        };
      }

      /*   if (isTokenExpired(token.token)) {
        const response = await refreshAccessToken(
          token.token,
          "token.refreshToken"
        );
        console.log("Update after expiration");
        console.log(datetime);

        //    if (!response) {
        //   console.log("Login required!!");
        //   console.log("RESPONSE=>", response);
        //   return { ...token, token: "", refreshToken: "" };
        // } 

        const { accessToken, refreshToken } = response;

        return { ...token, token: accessToken, refreshToken: refreshToken };
      } */

      return token;
    },

    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },
};

export default NextAuth(authOptions);
