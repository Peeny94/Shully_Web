import {styled} from "styled-components";
import { auth } from "../firebase";
import { Outlet,Link,useNavigate } from "react-router-dom";
import { ScrollImage } from "./cursor";
import autossing from "../imgs/autossing.jpg"; // 이미지 모듈로 가져오기
// import { Wrapper } from "./authComponents";
import React from "react";

const Wrapper = styled.div`
    display: grid;
    gap:50px;
    height: 100%;
    grid-template-columns: 1fr 4fr;
    padding: 50px 0px;
    width:100%;
    max-width: 860px;
`;
const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:20px;
`;
const MenuItem = styled.div`
    cursor:pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgb(157, 217, 217, 0.7);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    svg{
        width: 30px;
        fill: rgb(157, 217, 217);
        }
        &:hover {
        opacity: 0.8;
        border-color: rgb(180, 169, 88, 0.5); /* 호버 시 변경 *
        }
        &.log-out{
            border-color: rgb(157, 217, 217);
            svg{
            fill: brown;
        }
    }        
`;
export default function Layout(){
    const navigate = useNavigate();
    const onLogOut =async() => {
        // window. 을 붙여서 써야 됨. 주의!
        const ok = window.confirm("Are you sure you want to log out?");
        if(ok) {
            await auth.signOut();
            navigate("/login");
        }
    };
    return(
        <Wrapper>
            {/* alt =placeholder */}
            <ScrollImage src={autossing} alt="Autossing Image" />
            <Menu>
                <Link to="/">
                <MenuItem>
{/* homeIcon 20*20px */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
</svg>
                </MenuItem>
                </Link>

                <Link to="profile">
                <MenuItem>
{/* profileIcon 20*20px */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
</svg>
                </MenuItem>
                </Link>

                <MenuItem onClick={onLogOut} className="log-out">
{/* logoutIcon 20*20px */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" clipRule="evenodd" />
  <path fillRule="evenodd" d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z" clipRule="evenodd" />
</svg>
                </MenuItem>
            </Menu>
            <Outlet/>
        </Wrapper>
    );
}