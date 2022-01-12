// import 'tailwindcss/tailwind.css' //**import from local global.css **//
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'


function MyApp({ Component, pageProps:{ session , ...pageProps} }) {

  return(
    <SessionProvider session = {session}>
   
      <RecoilRoot>     {/* global state management library for React */}
      <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  ) 
}

export default MyApp
