import { styled } from "styled-components";
import { auth } from "../firebase";
import { GithubAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
import {useNavigate } from "react-router-dom";
import cloudelogo from "../imgs/cloude.svg";
import React from "react";

const Botton =styled.span`
    margin-top: 20px;
    background-color: rgb(157, 217, 217);
    font-weight: 300;
    width: 40%;
    color: black;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    // display: flex; - 강의 설정 
    display: inline-block; 
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
        &:hover {
        opacity: 0.8;
        }
`;

const Log = styled.img`
    height: 25px;
`; 
export default function GithubBotton() {
    const navigate = useNavigate();
    const onClick = async() => {
        try{
            const provider = new GithubAuthProvider();
            //2가지 방식으로 깃허브 로그인 기능 실행.
            //-> 1. popup, 2. redirection
            //await signInWithRedirect(auth,provider);
            await signInWithPopup(auth, provider); 
            //FirebaseError: Firebase: Error (auth/cancelled-popup-request).
            navigate("/");
        } catch(error) {
            console.error(error);
        }
    };
    return (
        <Botton onClick={onClick}>
            <Log src={cloudelogo}/>
            Continue with Github
        </Botton>
    );
}

