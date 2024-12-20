import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import cloudelogo from "../imgs/cloude.svg";
import cursor from "../imgs/cursor.svg";
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
    return (
        <Botton>
            <Log src={cloudelogo}/>
            Continue with Github
        </Botton>
    );
}

