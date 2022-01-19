import faker from 'faker';
import { useSession } from 'next-auth/react';
import { useEffect, useState} from 'react';
import Story from './Story';

function Stories() {

    const [suggesions, setSuggesions] = useState([]);
    const {data: session} = useSession();
    useEffect(() => {
        const suggesions = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }));

        setSuggesions(suggesions);
console.log(suggesions)
    }, []);
debugger;
    return (
        <div className = "flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
            {/* {session && (
                <Story img = {session.user.image} userName = {session.user.username}/>
            )}

            {suggesions.map((profile) => (
                <Story 
                    key= {profile.id} 
                    img = {profile.avatar}
                    userName = {profile.username}/>
            ))} */}
            {/* Story */}
            {/* Story */}
            {/* Story */}
            {/* Story */}
        </div>
    )
}

export default Stories
