import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post"

// const posts = [
//  {
//      id:12,
//      username: "Isuri upekha",
//      userimg: "https://www.wantedly.com/users/151444465/avatar?h=500&t=1624531997&w=500",
//      img: "https://www.wantedly.com/users/151444465/avatar?h=500&t=1624531997&w=500",
//      caption: "sonny's caption is too long"
//  },
//  {
//     id:23,
//     username: " upekha Isuri",
//     userimg: "https://www.wantedly.com/users/151444465/avatar?h=500&t=1624531997&w=500",
//     img: "https://www.wantedly.com/users/151444465/avatar?h=500&t=1624531997&w=500",
//     caption: "sonny's caption is too long"
// },
// ];



function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(
        () =>
            onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
                setPosts(snapshot.docs);
            })
        ,[db]
        );

    //can refactor again
    // useEffect(() => {
    //     return onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),snapshot =>{
    //          setPosts(snapshot.docs);
    //      })
    //  }, [db])
    //can refactor this code
    // useEffect(() => {
    //    const unsubscribe = onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),snapshot =>{
    //         setPosts(snapshot.docs);
    //     })
    //     return () => {
    //        unsubscribe()
    //     }
    // }, [db])

    console.log(posts);
    return (
        <div>
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.data().username}
                    userimg={post.data().profileimage}
                    img={post.data().image}
                    caption={post.data().caption} />
            ))}
        </div>
    )
}

export default Posts
