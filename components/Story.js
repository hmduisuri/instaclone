import { useRef } from "react";
import { useRecoilState } from "recoil";
// import { selectedUserNameState, selectedUserImgState,  statusState } from "../atoms/modelAtom";

function Story(props) {
    // const [modelOpen, setModelOpen] = useRecoilState(statusState);
    const selectedStatusOwnRef = useRef(null);
    // const [sltdUserName, setSltdUserName] = useRecoilState(selectedUserNameState);
    // const [sltdUserImg, setSltdUserImg] = useRecoilState(selectedUserImgState);


    const getSelectedUser = (e) => {
        // setModelOpen(true);
        // setSltdUserName(e?.currentTarget?.innerText);    
        // setSltdUserImg(e?.target?.currentSrc);    

        debugger;
    }
    selectedStatusOwnRef?.current?.value?setUserState(selectedStatusOwnRef.current.value):null;

    return (
        <>

        {/* <div onClick={(e) =>getSelectedUser(e) }> */}
            <img
                src={props.img}
                alt="profile pic"
                className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 
            object-contain cursor-pointer hover:scale-110 transition transform-duration-200 ease-out"
            />
            <p className="text-xs w-14 truncate text-center">{props.userName}</p>
        {/* </div> */}
        </>
    )
}

export default Story
