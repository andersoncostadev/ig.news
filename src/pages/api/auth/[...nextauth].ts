import {Create, Collection} from 'faunadb'

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import {faunaDb} from "../../../services/faunaDb";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

     await faunaDb.query(
      Create(
        Collection('users'),
        {
          data: {email},
        },
      )
     )
      return true
    }
}
  
})