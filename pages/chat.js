import { PaperAirplaneIcon } from '@heroicons/react/outline';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
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
  const [loadChat, setLoadChat] = useState(false);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [session]);

  useEffect(() => {
    const fakeusers = async() => {
            const res = await fetch('https://randomuser.me/api/?results=6').catch(function (e){
                console.log(error);
            });
            const req= await res.json().catch(function (e){
                console.log(error);
            });
            setUsers(req.results);
        }
        fakeusers().catch(console.error);

}, [])


  return <>
    <Header />
    {
      session && (
        <div className='bg-chatimg object-cover'>
        <div className='bg-gray-50 container mx-auto max-h-screen pt-5 bg-chatimg object-cover bg:rotate-180'>
          <div className='grid grid-cols-1 md:grid-cols-1 md:max-w-3xl xl:grid-cols-4 xl:max-w-6xl mx-auto
      drop-shadow-lg 
      border-[1px] border-gray-400 rounded-md overflow-hidden' >
            <div className="col-span-1 border-r-[1px] border-gray-300 bg-chatimg bg-cover">
              <div className='flex items-center justify-between p-5'>
                <h3 className=' font-bold' >Messages</h3>
                <h3 className='font-semibold text-[#5B2169]'>1 Request</h3>
              </div>

              {/* messaged list */}
              <div className=''>
                <div className='flex pl-5 py-2 cursor-pointer hover:bg-[#80808033]'
                  onClick={() => setLoadChat(true)}>
                  <img src={session?.user?.image} className="w-[3.5rem] rounded-full  border-[1.5px] border-[#5B2169]" alt="" />
                  <span className='bg-[#5B2169] w-4 h-4 inline-block rounded-full absolute'> </span>
                  <p className='px-5 text-md font-semibold'>{session?.user?.username}</p>
                </div>
                {
                  users?.map((user)=>(
                    <div className='flex pl-5 py-2 cursor-pointer hover:bg-[#80808033]'
                    >
                    <img src={user.picture?.thumbnail} className="w-[3.5rem] rounded-full  border-[1.5px] border-[#5B2169]" alt="" />
                    <span className='bg-[#5B2169] w-4 h-4 inline-block rounded-full absolute'> </span>
                    <p className='px-5 text-md font-semibold'>{user?.name?.first + ' ' + user?.name?.last}</p>
                  </div>
                  ))
                }

              </div>
            </div>
            <section className="xl:inline-grid md:col-span-3 p-5 bg-chatimg bg-repeat-y bg-cover">
              {loadChat ? <MessageThread /> :
                <div className='grid gap-4 content-center text-center '>
                  <PaperAirplaneIcon className='justify-self-center w-20 rotate-45 p-4 border-2 border-black rounded-full' />
                  <h3>Your Messages</h3>
                  <p className='text-gray-500 text-sm'>Send private photos and messages to a friend or group.</p>
                </div>
              }
            </section>
          </div>
        </div>
        </div>
      )
    }

  </>
}

export default chat;
