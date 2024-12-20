import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import {styled} from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
const errors = {
    "auth/email-already-in-use": "That email already exists."
}
const Wrapper =styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 420px;
    padding:50px 0px; 
`;
const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100px;
    
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
        cursor:url("cursor.cur") 2 2, 
        url("cursor.png") 2 2, 
        pointer;
        &:hover {
        opacity: 0.8;
        }
    }
`; 
const Title = styled.h1`
    font-size:  42px;
    
`;
const Error = styled.span`
    font-weight:600;
    color: tomato;
`;
export default function CreateAccount(){
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] =useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] =useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;
        if(name==="name") {
            setName(value);
        } else if(name==="email"){
            setEmail(value);
        } else if(name==="password"){
            setPassword(value);
        }  
    };
    const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr("");
        //1. create an account 2. set the name of the user 3. redirect to the 'home'- todo list 
        if(isLoading ||name===""|| email ==="" || password==="") return;
        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(credentials.user);
                await updateProfile(credentials.user, {
                    displayName: name,
                });
                navigate("/");
        } catch(e){
           //setError
           if(e instanceof FirebaseError){
            console.log(e.code, e.maeeage)
            setErr(e.message); 
            alert(`'이미 존재하는 계정입니다.'`);
           }
        } finally {
            setLoading(false);
        }
        console.log(name, email, password);
    }
    return( 
    <Wrapper>
        <Title>Join SHULLY</Title>
        <Form onSubmit ={onSubmit}>
            <Input onChange={onChange} name="name" value = {name} placeholder="Name" type= "text" required/>
            <Input onChange={onChange} name="email" value = {email} placeholder="Email" type= "email" required/>
            <Input onChange={onChange} name="password" value = {password} placeholder="Password" type= "password" required/>
            <Input type="submit" value={isLoading? "Loading.." : "Create Account"}/>
        </Form>
        {/* 상기의 setErr 에 값을 세팅해서 err 메세지를 띄운다.*/}
       {err !== ""? <Error> <p>{err}</p></Error> : null}
    </Wrapper>
    );
}