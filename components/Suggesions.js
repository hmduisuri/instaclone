import { useEffect, useState } from "react";
import faker from 'faker';


function Suggesions() {

    const [suggesions, setSuggesions] = useState([])

    useEffect(() => {
        const suggesions = [...Array(5)].map((_, i) => (
            {
                ...faker.helpers.contextualCard(),
                id: i
            }

        ))
        setSuggesions(suggesions);
    }, [])

    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between text-sm mb-5">
                <h3 className="text-sm font-bold text-gray-400">Suggesions for you</h3>
                <button className="font-semibold text-gray-600">See All</button>
            </div>

            {suggesions.map((profile) => (
                <div
                    key={profile.id}
                    className="flex items-center justify-between mt-3">

                    <img
                        src={profile.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full border p-[2px]" />
                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm">{profile.username}</h2>
                        <h3 className="text-xs text-gray-400">Works @ {profile.company.name}</h3>
                    </div>

                    <button className="text-blue-400 text-sm font-bold">Follow</button>
                </div>
            ))}
        </div>
    )
}

export default Suggesions
