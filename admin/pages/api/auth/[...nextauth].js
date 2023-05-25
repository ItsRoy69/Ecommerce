import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  
  adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions)