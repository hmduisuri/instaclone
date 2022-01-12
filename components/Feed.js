import Stories from "./Stories"
import Posts from "./Posts"
import MiniProfile from "./MiniProfile"
import Suggesions from "./Suggesions"
import { useSession } from "next-auth/react"

function Feed() {
    const {data: session} = useSession();
    return (
        <main className={`grid grid-cols-1  md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto p-5 ${!session &&
        "!grid-cols-1 !max-w-3xl"}`}>
            {/* section */}
            <section className="col-span-2">
                {/* stories */}
                <Stories />
                {/* posts */}
                <Posts />
            </section>
            {/* section */}
            {session && 
            <section className="hidden xl:inline-grid md:col-span-1">
                <div className="fixed pt-20">
                    <MiniProfile />
                    <Suggesions />
                </div>
            </section>
            }
        </main>
    )
}

export default Feed
