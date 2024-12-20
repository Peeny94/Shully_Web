import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import cloudelogo from "../imgs/cloude.svg";
import cursor from "../imgs/cursor.svg";
import React from "react";

const Botton =styled.span`
    margin-top: 50px;
    background-color: white;
    font-weight: 500;
    width: 100%;
    color: black;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Log = styled.img`
    height: 25px;
`; 
export default function GithubBotton() {
    return (
        <Botton>
            <Log src={cloudelogo}/>
            Continue with Guthub
        </Botton>
    );
}

