import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Story from "./Story";

//stories are render from server side.
// export async function getServerSideProps() {
//     const res = await fetch('https://randomuser.me/api/?results=20')
//     const data = await res.json();
//     // setStories(req.results)
// debugger;
// //props return from the server side 
//     return {
//         props: {
//             stories : data.results
//         }
//     }

// }

function StoriesDef() {
const [stories, setStories] = useState([]);
const {data: session} = useSession();

    useEffect(() => {
        const collectusers = async() => {
            // stories = [];
            // for(let i=0; i<=10; i++){
                const res = await fetch('https://randomuser.me/api/?results=20')
                const req= await res.json().catch(function (e){
                    console.log(error);
                });
                setStories(req.results)
                // const data = req.results[i];
                // stories.push(req.results[0]);
            // }
    
        }
      collectusers().catch(console.error);
    }, []);


    return (
        <div className = "flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
        {session && (
            <Story img = {session.user.image} userName = {session.user.username}/>
        )}

        {stories.map((profile) => (
            <Story 
                key= {profile?.cell} 
                img = {profile?.picture?.thumbnail}
                userName = {profile?.name?.first + ' ' + profile?.name?.last}/>
                ))}
    </div>
    )
}

export default StoriesDef
