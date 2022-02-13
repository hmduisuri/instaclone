import { PaperAirplaneIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Header from '../components/Header';
import MessageThread from '../components/MessageThread';
// import { ChatEngine } from 'react-chat-engine';
{/* <ChatEngine
            height='100vh'
            userName='admin'
            userSecret='isuri2Wsx'
            projectID='0e76b30f-9fe6-42a8-93c9-540c051f2430'
		        /> */}
function chat() {
  const { data: session } = useSession()
  const [ loadChat, setLoadChat ] = useState(false);
  return <>
    <Header />
    <div className='bg-gray-50 min-h-screen p-5'>
      <div className='grid grid-cols-1 min-h-screen md:grid-cols-2 md:max-w-3xl xl:grid-cols-4 xl:max-w-6xl mx-auto
      bg-gradient-to-r from-[#4b4b4b] via-[#8a4242] to-[#4b4b4b] drop-shadow-lg 
      border-[1px] border-gray-500 rounded-md'>
        <div className="col-span-1 border-r-[1px] border-gray-700">
          <div className='flex items-center justify-between p-5'>
            <h3 className=' font-bold' >Messages</h3>
            <h3 className='font-semibold text-blue-500'>1 Request</h3>
          </div>

          {/* messaged list */}
          <div className=''>

            <div className='flex pl-5 py-2 cursor-pointer hover:bg-[#80808033]'
              onClick={()=>setLoadChat(true)}>
              <img src={session?.user?.image} className="w-[3.5rem] rounded-full  border-[1.5px] border-gray-400" alt="" />
              <p className='px-5 text-md font-semibold'>{session?.user?.username}</p>
            </div>

          </div>
        </div>
        <section className="xl:inline-grid md:col-span-3 p-5">
          { loadChat ? <MessageThread/>:
          <div className='grid gap-4 content-center text-center '>
            <PaperAirplaneIcon className='justify-self-center w-20 rotate-45 p-4 border-2 border-black rounded-full' />
            <h3>Your Messages</h3>
            <p className='text-gray-200 text-sm'>Send private photos and messages to a friend or group.</p>
          </div>
          }
        </section>
      </div>

    </div>

  </>;
}

export default chat;
