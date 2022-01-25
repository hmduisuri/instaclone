import {atom} from "recoil";

export const modelState = atom({
    key: 'modelState',
    default: false,
})

export const statusState = atom({
    key:'statusState',
    default: false,
})

export const selectedUserNameState = atom({
    key: 'selectedUserNameState',
    default: null
})

export const selectedUserImgState = atom({
    key: 'selectedUserImgState',
    default: null
})