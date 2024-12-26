import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, updateDoc } from "firebase/firestore";
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
// db 생성 코드 설정
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if(!user ||isLoading|| shully==="" || shully.length>180) return;

        try{
            setLoading(true);
            //게시물을 하나의 변수로 명명
           const doc = await addDoc(collection(db, "shullys"),{
                shully,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userid: user.uid,
            });
            if(file){
                const locationRef = ref(
                    storage,`shullys/${user.uid}-${user.displayName}/${doc.id}`
                );
                console.log("1");
                await uploadBytes(locationRef, file);                   
                }
                setShully("");
                setFile(null);
                console.log("2");// 여기를 못 옴.
                }catch(e){
                    console.log(e);
                    console.log("0");
                } finally{
                    setLoading(false);
                }
                console.log("fin");
         };
    return (
    <PostFormWrapper onSubmit={onSubmit}>
        <PostTextArea required rows={5} maxLength={180} value={shully} onChange={onChange}placeholder="What is happening?"/>
{/* file이란 id를 가진 value를 input 함 */}
{/* htmlFor를 AttachFileInput의 id로 설정했기에 AttachFileButton을 클릭해도 AttachFileInput의 기능을 한다. */}
        <AttachFileButton htmlFor="file">
        {file ? "Photo added ✅" : "Add photo"}
        </AttachFileButton>
{/* accept: image 파일만 허용. 확장자 제한 X 
            type: file 업로드 할 수 있는 btn 으로 바뀜
            */}     
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*"/>

            <PostSubmitBtn type= "submit" value={isLoading ? "Posting..." : "Post Shully"}></PostSubmitBtn>

    </PostFormWrapper>
    )
}