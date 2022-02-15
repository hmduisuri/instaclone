import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: process.env.NEXT_AUTH_URL 
    }),
    // ...add more providers here
  ],

  pages:{
      signIn: "/auth/signin",
  },
  callbacks:{
    //enhanced the session
    async session({session, token, user}){
      //attaching customised values - already have name,image and email
       session.user.username = session.user.name.split(" ").join("").toLowerCase();
       //sub is the google userid commings back
       session.user.uid = token.sub;

       return Promise.resolve(session).catch(err=>console.log(err));
    },
    // async jwt({ token, account }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token
    //   }
    //   return token
    // },
    // async redirect({ url, baseUrl }) {
    //   debugger;
    //   console.log("base url" + baseUrl)
    //   return baseUrl
    // },
  }
})