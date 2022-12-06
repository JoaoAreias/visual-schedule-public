import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prismadb';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    adapter: PrismaAdapter(prisma),

    secret: process.env.JWT_SECRET,

    callbacks: {
        async session({ session, token, user }) {
            session.user.id = user.id
            
            return session
        }
    }
})