import { useSession } from 'next-auth/react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';

function MessageThread() {
    const messageRef = useRef("")
    const { data: session } = useSession();
    const [messages, setMessage] = useState([]);
    useEffect(() =>
        onSnapshot(query(collection(db, 'chat'), orderBy('timestamp', 'asc')), snapshot => {
            setMessage(snapshot.docs);

        }

        ), []);

    const sendMessage = async (e) => {
        e.preventDefault();
        const message = messageRef?.current?.value;
        
        await addDoc(collection(db, 'chat'), {
            username: session?.user?.username,
            avatar: session?.user?.image,
            message: message,
            uniqueid: session?.user?.uid,
            timestamp: serverTimestamp()
        })
            .then(function () {
                messageRef.current.value = "";
                console.log('Message sent');
                debugger;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <h1 className='text-lg font-bold'>My Instar Group Chat</h1>

            <div className='ml-5 mr-2 max-h-screen overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
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
            </div>

            {/* <form onsubmit="return false"> */}
            <div className='mt-5 flex border-t-2 border-gray-500'>

            <input type="text" className="bg-gray-50 block w-full h-10 pl-10 sm:text-sm mr-5
                            border-gray-300 focus:ring-black focus:border-black rounded-md " placeholder="Type a message" ref={messageRef} />
            <button type="button" className='flex-initial w-32 h-10 bg-blue-500 hover:bg-blue-700 text-black font-bold py-1 px-1 rounded-xl' onClick={sendMessage}
            >Send</button>
            </div>
            {/* </form> */}
        </>
    )
}

export default MessageThread