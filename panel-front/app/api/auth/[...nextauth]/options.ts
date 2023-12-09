import CredentialsProvider from 'next-auth/providers/credentials';
import crypto from 'crypto';
import type { NextAuthOptions } from "next-auth";

import { getUser } from '@/lib/database/auth';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // check if ts is retarded 
                if (!credentials?.username || !credentials?.password) return null;

                // its not retarded
                // hash the pass
                const salt = process.env.GLOBAL_SALT || 'a-default-salt'
                const hashedPassword = crypto.pbkdf2Sync(credentials?.password, salt, 10000, 64, 'sha256').toString('hex');

                const user = await getUser(credentials?.username, hashedPassword)
                if (user) {
                    return {
                        id: user.id,
                        name: user.name,
                        role: user.role
                    }
                } else {
                    return null
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    pages: {
        signIn: '/',
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                // ts is retarded -> confirmed try removing the 'as number'
                token.id = user.id as number;
            }
            return token;
        },
        async session({session, token}) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.role = token.role
            
            return session;
        }
    }
}