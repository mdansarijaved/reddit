import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";
import { singInSchema } from "./schema/schema";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./lib/auth/account/user";

export default {
  providers: [
    Resend({
      // If your environment variable is named differently than default
      from: "javedansari@javedet.co",
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({ 
      async authorize(credentials) {
        const validatesFields = singInSchema.safeParse(credentials);

        if (validatesFields.success) {
          const { email, password } = validatesFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
