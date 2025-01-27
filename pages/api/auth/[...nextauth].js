// import { toastErrorNotify } from "@/helpers/ToastNotify";
import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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
            `https://apl.attensam.at/atina/AtinaUsers/login`,
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

      return token;
    },

    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },
};

export default NextAuth(authOptions);
