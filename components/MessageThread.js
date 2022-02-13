import { useSession } from 'next-auth/react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import dynamic from 'next/dynamic';

function MessageThread() {
    // const messageRef = useRef("")
    const [typeMessage, setTypedMessage] = useState('');
    const { data: session } = useSession();
    const [messages, setMessage] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const Picker = dynamic(() => import('emoji-picker-react'));
    const scrollSpan = useRef();
    useEffect(() =>
        onSnapshot(query(collection(db, 'chat'), orderBy('timestamp', 'asc')), snapshot => {
            setMessage(snapshot.docs);
            scrollSpan.current.scrollIntoView({ behavior: "smooth" });
        }

        ), []);

    const onEmojiClicked = (event, emojiObject) => {
        debugger;
        setTypedMessage(previous => previous + emojiObject.emoji);

        // setShowPicker(false);
    }
    const sendMessage = async (e) => {
        e.preventDefault();
        const message = typeMessage;

        await addDoc(collection(db, 'chat'), {
            username: session?.user?.username,
            avatar: session?.user?.image,
            message: message,
            uniqueid: session?.user?.uid,
            timestamp: serverTimestamp()
        })
            .then(function () {
                setTypedMessage("");
                console.log('Message sent');
                debugger;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <h1 className='text-lg font-bold border-b-2 border-gray-500 pb-2 mb-2'>My Instar Group Chat</h1>

            <div className='ml-5 mr-2 max-h-[27rem] overflow-y-scroll scrollbar-thumb-black scrollbar-thin '>
                {
                    messages?.map(mess => (
                        <ul className='space-y-2 '>
                            {mess.data()?.uniqueid === session?.user?.uid ?
                                <li key={mess.id} className="flex mr-5 justify-end">
                                    <div className='inline-flex items-end'>
                                        <div className="text-right">
                                            <p className='text-xs italic'>{mess?.data()?.username}</p>
                                            <p className='p-2 bg-[#00000057] rounded-md '>
                                                {mess.data().message}
                                            </p>
                                        </div>
                                        {/* <img src={mess.data().avatar} className="flex-none ml-2 border-2 border-green-800 rounded-full w-9 h-9" alt="" /> */}
                                    </div>
                                </li>
                                :
                                <li key={mess.id} className="flex mr-5 justify-start">
                                    <div className='inline-flex items-end'>
                                        <img src={mess.data().avatar} className="mr-2 border-2 border-green-800 rounded-full w-9" alt="" />
                                        <div className="text-left">
                                            <p className='text-xs italic'>{mess?.data()?.username}</p>
                                            <p className='p-2 bg-[#00000057] rounded-md '>
                                                {mess.data().message}
                                            </p>

                                        </div>
                                    </div>
                                </li>
                            }
                        </ul>
                    ))
                }
                <span ref={scrollSpan}></span>
            </div>
            {/* <form onsubmit="return false"> */}
            <div className='mt-5 pt-5 flex border-t-2 border-gray-500'>
                <div className='hidden md:flex'>

                <EmojiHappyIcon className="h-10 pr-2 cursor-pointer"
                    onClick={() => setShowPicker(!showPicker)} />
                </div>

                {showPicker &&
                    <div className='!relative top-[-20.2rem]'
                    //    onBlur={()=>setShowPicker(false)}
                    >
                        <Picker className="aside.emoji-picker-react"
                            onEmojiClick={onEmojiClicked}
                        />
                    </div>
                }
                <input
                    type="text"
                    className="bg-gray-50 block w-full h-10 pl-10 sm:text-sm mr-5
                            border-gray-300 focus:ring-black focus:border-black rounded-md "
                    placeholder="Type a message"
                    // ref={messageRef} 
                    value={typeMessage}
                    onChange={(e) => setTypedMessage(e.target.value)} />
                <button type="button" className='flex-initial w-32 h-10 bg-blue-500 hover:bg-blue-700 text-black font-bold py-1 px-1 rounded-xl' onClick={sendMessage}
                >Send</button>
            </div>
            {/* </form> */}
        </>
    )
}

export default MessageThread