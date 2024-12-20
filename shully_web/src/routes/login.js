import { useState } from "react";
import {styled} from "styled-components";
import { auth } from "../firebase";
import { Link,useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
    Form,
    Error,
    Switcher,
    Wrapper,
  } from "../components/authComponents";
import GithubBotton from "../components/githubBtn";


const Button = styled.button`
// all: unset; /* 기본 스타일 제거 */
  display: inline-block; /* 레이아웃 정렬 */
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  background-color: rgb(157, 217, 217);
  outline-color: rgb(191, 169, 88);
  font-size: 16px;
  width: 71.5%;
  cursor: pointer;
  
  &:hover {
    border-color: rgb(191, 169, 88); /* 호버 시 변경 */
  }
`;

const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: rgb(33, 83, 83);
    background-size: cover;
    background-color: rgb(157, 217, 217);
    // background-image:url("cloud.jpg");
    width: 300%; //강의와 다른 설정 (<-100)
    outline-color: rgb(191, 169, 88);
    font-size:16px;
    &[type="submit"] {
        cursor:pointer;
        &:hover {
        opacity: 0.8;
        }
    }
`;

const Title = styled.h1`
    font-size: 42px;
    text-align: justify;
    color: rgb(157, 217, 217);
    position: relative;; 
    left: -3.5%;
`;

//react component 명명은 대문자로 시작!
export default function LoginAccount(){
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] =useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;
        if(name==="email"){
            setEmail(value);
        } else if(name==="password"){
            setPassword(value);
        }  
    };
    const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr("");
        if(isLoading || email ==="" || password==="") return;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch(e){
           //setError
           if(e instanceof FirebaseError){
            console.log(e.code, e.massage)
            setErr(e.message); 
           }
        } finally {
            setLoading(false);
        }
        console.log(email, password);
    }
    return( 
     <Wrapper>
        <Title>Login into SHULLY</Title>      
        <Form onSubmit ={onSubmit}>
            <Input onChange={onChange} name="email" value = {email} placeholder="Email" type= "email" required/>
            <Input onChange={onChange} name="password" value = {password} placeholder="Password" type= "password" required/>
            <Input type="submit"  value={isLoading? "Loading.." : "Log in"}/>           
        </Form>
        <Button onClick={() => navigate("/createAccount")}>Join into Shully</Button>
        {/* 상기의 setErr 에 값을 세팅해서 err 메세지를 띄운다.*/}
       {err !== ""? <Error> {err}</Error> : null}
       {/* <Switcher>
        <Link to="/createAccount">Create one &rarr;</Link>
       </Switcher> */}
       <GithubBotton/>
    </Wrapper>
    );
}