import { useState } from "react";
import {styled} from "styled-components";
import { PostFormWrapper, PostTextArea, PostSubmitBtn, AttachFileButton, AttachFileInput} from "./auth-Components";


export default function PostForm(){
    const [isLoading, setLoading] = useState(false);
    const[shully, setShully] = useState("");
    // const [file, setFile] = useState<File | null>(null); // 해당코드를 바꿔줬다. 
    const[file, setFile] = useState(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setShully(e.target.value || "");// 문자열 아니면 공백
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
          setFile(files[0]);
        } else{
            setFile(null);// 파일을 저장 하거나, 또는 빈 배열 값이 저장되도록 오류방지.
        }

    };
    return (
    <PostFormWrapper>
        <PostTextArea rows={5} maxLength={180}  placeholder="What is happening?"/>
{/* file이란 id를 가진 value를 input 함 */}
        <AttachFileButton htmlFor="file">
        {file ? "Photo added ✅" : "Add photo"}
        </AttachFileButton>
{/* accept: image 파일만 허용. 확장자 제한 X 
            type: file 업로드 할 수 있는 btn 으로 바뀜
            */}     
        <AttachFileInput type="file" id="file" accept="image/*"/>

            <PostSubmitBtn type= "submit" value={isLoading ? "Posting..." : "Post Shully"}></PostSubmitBtn>

    </PostFormWrapper>
    )
}