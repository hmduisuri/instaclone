import { async } from "@firebase/util"
import {getProviders , signIn as signIntoProvider} from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

// function signin(){
//   return(
//     <button>Signin with Google</button>
//   )
// }
//running on the browser
// function signin({providers}) {
function signin() {
  const [providers, setProviders] = useState([]);
  
  useEffect(() => {
    const providers = async() =>{
      const providerslist = await getProviders();
      console.log(providerslist)
      setProviders(providerslist);
      debugger;
    }
    providers().catch(console.error);

},[]);

    return (
        //from te https://next-auth.js.org/v3/configuration/pages "auth sign in example"
        <>
        <Header/>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-14 text-center">
           <img className="w-80" src="https://links.papareact.com/ocw" alt=""/>
        <div className="mt-40">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className="p-3 bg-blue-400 border-2 rounded-lg text-white" onClick={() => signIntoProvider(provider.id, {callbackUrl:"https://myinstar.netlify.app/"})}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
        </div></div>
      </>
    )
}

//running on the middle server side render
// export async function getServerSideProps(){
//     const providers = await getProviders();

//     return {
//         props: {
//             providers
//         }
//     }
// }

export default signin

// firebase testing rule
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2022, 2, 5);
//     }
//   }
// }
