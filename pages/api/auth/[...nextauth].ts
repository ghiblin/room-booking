import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";

let prisma: PrismaClient | null = null;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const options: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],

  adapter: PrismaAdapter(prisma),
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
