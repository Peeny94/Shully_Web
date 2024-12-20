// 언젠가 커서 커스터마이징. 아이원튜. 베베.

import { styled } from "styled-components";
import cursor from "../imgs/cursor.svg";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import cloudelogo from "../imgs/cloude.svg";
import cursor from "../imgs/cursor.svg";

const Botton =styled.span`
    margin-top: 50px;
    background-color: white;
    font-weight: 500;
    width: 800%;
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
export default function Cursor() {
    return (
        <Botton>
        <Log src={cloudelogo}/>
    </Botton>
    );
}





