import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import redis from "@/lib/redis";
import { fetchRedis } from "@/helpers/redis";
import { googleCredentials } from "@/lib/credentials";

const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(redis),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "../../",
  },
  providers: [
    GoogleProvider({
      clientId: googleCredentials().clientId,
      clientSecret: googleCredentials().clientSecret,
      checks: "pkce",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = (await fetchRedis("get", `user:${token.id}`)) as
        | string
        | null;
      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      const userExists = JSON.parse(dbUser) as User;

      return {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        picture: userExists.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
};

export default authOptions;
