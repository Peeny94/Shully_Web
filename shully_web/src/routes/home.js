import { auth } from "../firebase";
import {styled} from "styled-components";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/postForm";
import { Wrapper } from "../components/auth-Components";

export default function Home() {
    const navigate = useNavigate(); // 
    const logOut = () => {
        auth.signOut().then(() => {
            navigate("/login");
        }).catch((error) => {
            console.error("Logout failed:", error);
        });
    };
        
    return (
        <Wrapper>
        <button onClick={logOut}>logout</button> 
        <PostForm/>
        </Wrapper>
    );
}