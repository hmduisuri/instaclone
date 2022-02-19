import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

export default NextAuth({

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.NEXT_AUTH_URL 
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
    // ...add more providers here
  ],

  pages:{
      signIn: "/auth/signin",
  },
  callbacks:{
    //enhanced the session
    async session({session, token}){
      debugger;
      try{ 
      //attaching customised values - already have name,image and email
       session.user.username = session.user.name.split(" ").join("").toLowerCase();
       //sub is the google userid commings back
       session.user.uid = token.sub;

       return Promise.resolve(session).catch(err=>console.log(err));
      }catch(err){
        console.log(err)
      }
    },
    // async jwt({ token, account }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token
    //   }
    //   return token
    // },
    // redirect: async( url, baseUrl ) => {
    //   debugger;

    //   console.log('url' + url + baseUrl)
      // if(url === '/auth/signin'){
      //     return Promise.resolve('/hhe');
      // }
    //   return Promise.resolve('https://myinstar.netlify.app/').catch(err=>console.log(err));
    
    // },
  }
})