import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFiiled } from "@heroicons/react/solid";
import { db } from '../firebase';
import dynamic from "next/dynamic";

function Post(props) {
    const { data: session } = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    const Picker = dynamic(() => import('emoji-picker-react'));
    useEffect(
        
        () =>
            onSnapshot(query(collection(db, 'posts', props.id, 'comments'), orderBy('timestamp', 'desc')),
                snapshot => setComments(snapshot.docs))
        , [db, props.id]
    );

    useEffect(
        () =>
            onSnapshot(collection(db, 'posts', props.id, 'likes'),
                snapshot => setLikes(snapshot.docs))
        , [db, props.id]
    );

    useEffect(
        () =>
            setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1
            ),
        [likes]);

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', props.id, 'likes', session.user.uid)).catch(function (e){
                console.log(error);
            });
        } else {
            await setDoc(doc(db, 'posts', props.id, 'likes', session.user.uid), {
                username: session.user.username,
            }).catch(function (e){
                console.log(error);
            });
        }
    };

    const sendComment = async (e) => {
        e.preventDefault();
        const commentTosend = comment;
        setComment("");

        await addDoc(collection(db, 'posts', props.id, 'comments'), {
            comment: commentTosend,
            username: session.user.username,
            userimg: session.user.image,
            timestamp: serverTimestamp()
        }).catch(function (e){
            console.log(error);
        });
    }
    const onEmojiClicked = (event, emojiObject) => {
        debugger;
        setComment(previous => previous + emojiObject.emoji);
        // setShowPicker(false);
    }

    return (
        <div className="bg-white my-7 border rounded-sm">
            {/* id, username, userimg, img, caption */}
            {/* header */}
            <div className="flex items-center p-5">
                <img src={props.userimg} alt="" className="rounded-full h-12 w-12 object-contain border p-1 mr-3" />
                <p className="flex-1 font-bold">{props.username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>
            {/* image */}
            <img src={props.img} alt="" className="object-cover w-full " />
            {/* buttons */}
            {session && (
                <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        {
                            hasLiked ? (
                                <HeartIconFiiled onClick={likePost} className="btn text-purple-800" />
                            ) : (
                                <HeartIcon onClick={likePost} className="btn" />
                            )
                        }
                        <ChatIcon className="btn" />
                        <PaperAirplaneIcon className="btn" />
                    </div>
                    <BookmarkIcon className="btn" />
                </div>
            )}

            {/* caption */}
            <div className="p-5 truncate">
                {likes.length > 0 && (
                    likes.length == 1 ? (
                        <p className='font-bold mb-1'>1 like</p>
                    ) : <p className='font-bold mb-1'>{likes.length}  likes</p>
                )}
                <span className="font-bold mr-1">{props.username} </span> {props.caption}
            </div>
            {/* comment */}
            {comments.length > 0 && (
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <img
                                className="h-7 rounded-full"
                                src={comment.data().userimg} alt="" />
                            <p className="text-xm flex-1">
                                <span className="font-bold">
                                    {comment.data().username}
                                </span>{" "}
                                {comment.data().comment}
                            </p>

                            {/* <Moment fromNow className="pr-5 text-xs">{comment.data().timestamp?.toDate()}</Moment> */}
                        </div>
                    ))}
                </div>
            )}
            {/* input boxes */}
            {session && (
                <form className="flex items-center p-4">
                    <EmojiHappyIcon className="h-7 cursor-pointer"
                         onClick={() => setShowPicker(!showPicker)} />
                    <input
                        type="text"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="border-none flex-1 focus:ring-0 outline-none"
                        ></input>
                        {showPicker &&
                           <div className='!relative left-[-43rem] top-[-21rem]'
                        //    onBlur={()=>setShowPicker(false)}
                           >
                               <Picker className="aside.emoji-picker-react" 
                               onEmojiClick={onEmojiClicked} 
                               />
                           </div>
                       }
                    <button
                        type="submit"
                        disabled={!comment.trim()}
                        onClick={sendComment}
                        className="font-semibold text-blue-400">Post</button>
                </form>
            )}

        </div>
    )
}

export default Post
