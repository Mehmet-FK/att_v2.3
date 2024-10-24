// import { toastErrorNotify } from "@/helpers/ToastNotify";
import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // session: {
  //   strategy: "jwt",
  // },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        let res = null;

        const { username, password } = credentials;
        try {
          const { data } = await axios.post(
            `https://apl.attensam.at/atina/AtinaUsers/login?username=${username}&password=${password}`
          );
          res = data;
        } catch (error) {
          let code = error?.response?.status || "";
          throw Error(code + " Etwas ist schiefgelaufen!");
        }
        return res;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
