import { useSession } from 'next-auth/react';
import { useRecoilState } from "recoil"
import { selectedUserNameState, selectedUserImgState, statusState } from "../atoms/modelAtom";

import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react";
function StateModel() {
    const MY_ACCESS_KEY = "7xD3AvkToUrfIhls1imJyJec8R3Z4am_netgggBC9ag"
    const {data: session} = useSession();
    const [open, setOpen] = useRecoilState(statusState);
    const [sltdUserName, setSltdUserName] = useRecoilState(selectedUserNameState);
    const [sltdUserImg, setSltdUserImg] = useRecoilState(selectedUserImgState);

    const [userStatus, setuserStatus] = useState('');
    const [alt, setalt] = useState('');
    const getRandomPhoto = async() => {
        
        const searchUrl = 'https://api.unsplash.com/photos/random/'+`?client_id=${MY_ACCESS_KEY}`;
        // console.log('userstate '+sltdUserState)
        try {
            const res = await fetch(searchUrl);
            const req = await res.json();
            setuserStatus(req.urls.regular);
            setalt = req.alt_description;
            // console.log(userStatus)
        } catch (err) {
            console.log(err)
        }
    }
    getRandomPhoto();

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={setOpen}>

                <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 
                     text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This elemant is to trick the browser into centering the model contents */}

                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >

                        <div className="inline-block align-bottom px-5 pt-1 pb-4 text-left 
                         overflow-hidden sm:my-[5rem] sm:align-middle sm:max-w-sm sm:w-full sm:p-2 transition-all transform bg-white shadow-xl rounded-lg " >
                            <div>
                                {/* {selectedFile?(
                                    <img src={selectedFile} onClick={()=> setSeletdFile(null)} alt="" />
                                ):(
                                    <div
                                    className = "w-full object-contain cursor-pointer"
                                    onClick={() => filePikerRef.current.click()}
                                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
                                    <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                )} */}
                               
                                <div>
                                    <div className=" text-center">
                                        <Dialog.Title
                                            // as="h3"
                                            className="mx-auto flex">
                                                <img className="h-8 w-8 rounded-full p-[1.5px] border-red-500 border-2 mx-2" src={sltdUserImg} alt="" />
                                                <h2 className="font-semibold text-sm">{sltdUserName}</h2>
                                        </Dialog.Title>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mt-5 sm:mt-6">
                                      <img src={userStatus} alt={alt} />  
                                </div>
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default StateModel
