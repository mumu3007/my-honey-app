import NextAuth, { AuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { DefaultJWT } from 'next-auth/jwt';

const prisma = new PrismaClient()

// export interface CustomJWT extends DefaultJWT {
//   id?: string | number;
// }

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password!))
        ) {
          // Map user fields to match the expected User type
          return {
            id: user.id, // Convert id to string as NextAuth expects a string id
            name: user.name,
            email: user.email,
          }
        } else {
          throw new Error('Invalid email or password')
        }
      },
    }),
     GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as unknown as import('next-auth/adapters').Adapter,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        console.log('User data in JWT:', user);
        token.id = Number(user.id)  // Store user id in the token
        token.name = user.name; // เก็บชื่อใหม่ใน token
        token.email = user.email; // เก็บอีเมลใหม่ใน token
        token.picture = user.image;
      }
      else{
        console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',);
      }

      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
         console.log('Token data in session:', token); 
        session.user.id = Number(token.id) // Include user id in the session
        session.user.name = token.name! || ""; // ใช้ข้อมูลที่อัปเดตใน session
        session.user.email = token.email! || "";
        session.user.image = token.picture // Include user id in the session
      }
      return session
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/profile`
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
