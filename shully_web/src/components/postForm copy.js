import { useState } from "react";
import {styled} from "styled-components";
import { PostFormWrapper, PostTextArea, PostSubmitBtn, AttachFileButton, AttachFileInput} from "./auth-Components";


export default function PostForm(){
    const [isLoading, setLoading] = useState(false);
    const[shully, setShully] = useState("");
    const[file, setFile] = useState<File| null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setShully(e.target.value || "");// 문자열 아니면 공백
    };
    // const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { files } = e.target;
    //     if (files && files.length === 1) {
    //       setFile(files[0]);
    //     }
    //     console.log("shully:", shully);
    //     console.log("file:", file);
    // };
    return (
    <PostFormWrapper>
        <PostTextArea rows={5} maxLength={180} value={shully} onChange={onChange} placeholder="What is happening?"/>
{/* file이란 id를 가진 value를 input 함 */}
        <AttachFileButton htmlFor="file">
        {file ? "Photo added ✅" : "Add photo"}
        </AttachFileButton>
{/* accept: image 파일만 허용. 확장자 제한 X 
            type: file 업로드 할 수 있는 btn 으로 바뀜
            */}     
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*"/>

            <PostSubmitBtn type= "submit" value={isLoading? "Posting..." : "Post shully"}>

            </PostSubmitBtn>

    </PostFormWrapper>
    )
}