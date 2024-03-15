// import { toastErrorNotify } from "@/helpers/ToastNotify";
import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      // type: "credentials",
      name: "Credentials",
      credentials: {
        // username: { label: "username", type: "text" },
        // password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        let res = null;

        const { username, password } = credentials;
        try {
          const { data } = await axios.post(
            `https://apl.attensam.at/api/auth/login`,
            { username, password }
          );
          res = { token: data };
        } catch (error) {
          console.log("ERRORRRRRRRR===>");
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
      console.log("JWT", token);
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      console.log("SESSION", token);
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
