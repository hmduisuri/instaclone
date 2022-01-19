import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  pages:{
      signIn: "/auth/signin",
  },
//enhanced the session
  callbacks:{
    async session({session, token, user}){
      //attaching customised values - already have name,image and email
       session.user.username = session.user.name.split(" ").join("").toLowerCase();
       //sub is the google userid commings back
       session.user.uid = token.sub;

       return session;
    },
  }
})