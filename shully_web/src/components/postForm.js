import { useState } from "react";
import {styled} from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
// Textarea 에는 박스 크기 조절 기능이 기본적으로 있다.
const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: whitesmoke;
    background-color: antiquewhite;
    width: 100%;
    resize:none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &::placeholder{
        font-size: 1;
    }
    &:focus {
        outline: none;
        border-color: #1d9bf0;
    `;
const AttachFileButton =styled.label`
    padding: 10px 0px;
    color: #1d9bf0;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #1d9bf0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;
const AttachFileInput = styled.input`
    display: none;
`;
const SubmitBtn = styled.input`
    background-color: #1d9bf0;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active{
        opacity: 0.9;
    }
}
`;

export default function PostForm(){

    return (
    <Form>
        <TextArea placeholder="What is happening?"/>
        {/* file이란 id를 가진 value를 input 함 */}
        <AttachFileButton htmlFor="file">Add photo</AttachFileButton>
        {/* accept: image 파일만 허용. 확장자 제한 X 
            type: file 업로드 할 수 있는 btn 으로 바뀜
        */}
        <AttachFileInput type="file" id="file" accept="image/*"/>
        <SubmitBtn type= "submit" value="Post shully"/>
    </Form>
    );
}