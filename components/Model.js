import { useSession } from 'next-auth/react';
import { useRecoilState } from "recoil"
import { modelState } from "../atoms/modelAtom";
import { Dialog, Transition } from "@headlessui/react"
import { CameraIcon } from "@heroicons/react/outline";
import { Fragment, useRef, useState } from "react";
import { db, storage} from "../firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

function Model() {
    const {data: session} = useSession();
    const [open, setOpen] = useRecoilState(modelState);
    const filePikerRef = useRef(null);
    const captionRef = useRef(null);
    const [selectedFile, setSeletdFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadPost = async() => {
        if(loading) return;

        setLoading(true);
        // 1) create a post and upload it to the firestore 'posts' collection
        // 2) Get the post ID for the newly ceated posts
        // 3) Upload image to firebase storage with the post ID 
        // 4) Get the download URL from fb storage and upload the original post with image.

        // 1)
        const docRef = await addDoc(collection(db,'posts'), {
            username: session.user.username,
            caption: captionRef.current.value,
            profileimage: session.user.image,
            timestamp: serverTimestamp()
        }).catch(function(error) {
            console.log(error);
        });
        // 2)
        console.log("New Doc added with ID", docRef.id);
        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        // 3)
        await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRef).catch(function (e){
                console.log(error);
            });

            // 4)
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadURL
            }).catch(function (e){
                console.log(error);
            });
        });

        setOpen(false);
        setLoading(false);
        setSeletdFile(null);

    }

    const addImageToPost = (e) =>{
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSeletdFile(readerEvent.target.result);
        };

    }

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

                        <div className="inline-block align-bottom px-4 pt-5 pb-4 text-left 
                         overflow-hidden sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 transition-all transform bg-white shadow-xl rounded-lg " >
                            <div>
                                {selectedFile?(
                                    <img src={selectedFile} onClick={()=> setSeletdFile(null)} alt="" />
                                ):(
                                    <div
                                    className = "w-full object-contain cursor-pointer"
                                    onClick={() => filePikerRef.current.click()}
                                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
                                    <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                )}
                               
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-gray-900">
                                            Upload a photo
                                        </Dialog.Title>
                                        <div>
                                            <input
                                              ref = {filePikerRef}
                                              type="file" hidden 
                                              onChange={addImageToPost}/>
                                        </div>
                                        <div className="mt-2">
                                            <input type="text" 
                                            className="border-none focus:ring-0 w-full text-center" 
                                            ref = {captionRef}
                                            placeholder="Please enter a caption..."
                                             />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mt-5 sm:mt-6">
                                    <button type="button" 
                                    disabled={!selectedFile}
                                    className="inline-flex justify-center w-full rounded-md border border-transparent
                            shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-white 
                             focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                             disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                             onClick={uploadPost}>
                                 {loading?"Updating":"Upoload Post"}
                                        
                                    </button>
                                </div>
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Model
