import React, { useState } from 'react';
import Image from 'next/image';
import {
    SearchIcon,
    SearchCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
    PlusCircleIcon
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import { useRecoilState } from 'recoil';
import { modelState } from '../atoms/modelAtom';

function Header() {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modelState);
    const [menuClicked, setMenuClicked] = useState()

    const router = useRouter();

    return (
        <>
            <div className="shadow-sm border-b bg-white sticky top-0 z-50 p-4 md:p-2">
                <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
                    {/* left */}
                    {/* hide instargram in mobile screen. coz next.js is mainly for mobile*/}
                    <div onClick={() => router.push('/')} className="relative hidden lg:inline-grid w-24 cursor-pointer">
                        <Image src="https://links.papareact.com/ocw"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>

                    {/* hide instalogo in big screen. coz next.js is mainly for mobile*/}
                    <div onClick={() => router.push('/')} className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
                        <Image src="https://links.papareact.com/jjm"
                            layout="fill"
                            objectFit="contain" />
                    </div>

                    {/* middle  - search bar*/}
                    <div className="max-w-5 hidden md:inline-block">
                        <div className="relative mt-1 p-3 rounded-md">
                            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-500" />
                            </div>
                            <input className="bg-gray-50 block w-full pl-10 sm:text-sm
                            border-[#be9fc5] focus:ring-black focus:border-black rounded-md"
                                type="text"
                                placeholder="Search" />
                        </div>
                    </div>


                    {/* right */}
                    <div className="flex items-center justify-end space-x-4">
                        <HomeIcon onClick={() => router.push('/')} className="navBtn hidden md:inline-block" />
                        {/* <MenuIcon onClick={() => setMenuClicked(!menuClicked)} className="h-6 md:hidden cursor-pointer" /> */}

                        {session ? (
                            <>
                                    <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
                                <div className="relative navBtn">
                                    <PaperAirplaneIcon onClick={() => router.push('/chat')} className="navBtn rotate-45" />
                                    <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex 
                         items-center justify-center animate-pulse text-white">3</div>
                                </div>
                                <UserGroupIcon className="navBtn hidden md:inline-block" />
                                <HeartIcon className="navBtn hidden md:inline-block" />

                                <img
                                    onClick={signOut}
                                    src={session?.user?.image}
                                    alt="profile picture"
                                    className="h-10 rounded-full
                    cursor-pointer"/>
                            </>
                        ) : (
                            <button onClick={() => signIn()} className="font-bold text-[#5B2169]">SIgn In</button>
                        )}

                    </div>
                </div>
                {/* <div className="shadow-sm border-b bg-white sticky top-0 z-50 h-[2.5rem] p-[9px] md:hidden"> */}
                {/* message, upload icons */}
                {/* {session && (
                <div className="flex justify-between max-w-6xl mx-5 pb-1 md:hidden lg:mx-auto">
                    <div className='shadow-lg rounded-[12px] p-[0.9rem] self-center cursor-pointer'>
                        <UserGroupIcon className="h-5 " />
                        <div className="absolute top-[4.4rem] left-[2.9rem] text-xs w-5 h-5 bg-red-500 rounded-full flex 
                         items-center justify-center animate-pulse text-white">3</div>
                    </div>
                    <div className='shadow-lg rounded-[12px] p-[0.9rem] self-center cursor-pointer'>
                        <HeartIcon className="h-5" />
                    </div>
                    <div onClick={() => router.push('/chat')} className='shadow-md rounded-[12px] p-[0.9rem] self-center  cursor-pointer'>
                        <PaperAirplaneIcon className="h-5 rotate-45" />
                        <div className="absolute top-[4.4rem] left-[28.4rem] text-xs w-5 h-5 bg-red-500 rounded-full flex 
                         items-center justify-center animate-pulse text-white">8</div>
                    </div>
                    <div onClick={() => setOpen(true)} className='shadow-lg rounded-[12px] p-[0.9rem] self-center cursor-pointer'>
                        <PlusCircleIcon  className="h-5 " />
                    </div>
                </div>
                )} */}
            </div>


        </>
    )
}

export default Header
