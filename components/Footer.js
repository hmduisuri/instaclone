import { HeartIcon, PaperAirplaneIcon, PlusCircleIcon, UserGroupIcon } from '@heroicons/react/outline'
import { Router, useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil';
import { modelState } from '../atoms/modelAtom';
import { useSession } from 'next-auth/react';

function Footer() {
    const router = useRouter();

    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modelState);
    return (
        <>  
        {session? (
        <div className="shadow-sm border-b bg-white sticky top-0 z-50 h-[2.5rem] p-[9px] md:hidden">
            <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
                <PaperAirplaneIcon onClick={() => router.push('/chat')} className="h-5 rotate-45" />
                <div className="absolute top-[0.1rem] left-[2.5rem] text-xs w-5 h-5 bg-red-500 rounded-full flex 
                         items-center justify-center animate-pulse text-white">3</div>

                <PlusCircleIcon onClick={() => setOpen(true)} className="h-5 cursor-pointer" />
                <UserGroupIcon className="h-5 cursor-pointer" />
                <HeartIcon className="h-5 cursor-pointer" />

            </div>

        </div>
          ):null  }
        </>

    )
}

export default Footer