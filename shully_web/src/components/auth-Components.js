import { styled } from "styled-components";

export const Wrapper =styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 420px;
    padding:50px 0px; 
`;
export const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100px;
    
`;
export const Input = styled.input`
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
export const Title = styled.h1`
    font-size:  42px;
    
`;
export const Error = styled.span`
    font-weight:600;
    color: tomato;
`;

export const Switcher = styled.span`
    margin-top: 20px;
    a{
    color: #1d9bf0;
    }
`;