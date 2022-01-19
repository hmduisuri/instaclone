import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import randomProfile from "random-profile-generator";
import Story from "./Story";

function StoriesDef() {
const [stories, setStories] = useState([]);
const {data: session} = useSession();

    useEffect(() => {
      const stories =  [...Array(20)].map((i) => ({
        ...randomProfile.profile(),
        id: i,
      }));
      setStories(stories);
        console.log(stories);
    }, []);

debugger

    return (
        <div className = "flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
        {session && (
            <Story img = {session.user.image} userName = {session.user.username}/>
        )}

        {stories.map((profile) => (
            <Story 
                key= {profile.id} 
                img = {profile.avatar}
                userName = {profile.fullName}/>
                
        ))}
        {/* Story */}
        {/* Story */}
        {/* Story */}
        {/* Story */}
    </div>
    )
}

export default StoriesDef
