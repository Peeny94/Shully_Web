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
            // 타입 검증을 위에서 코드를 바꿔줬어서. 만일의 경우로 File 검증을 시도해서 저장.
            if (files[0] instanceof File) {
                setFile(files[0]); // 올바른 File 객체만 상태에 저장
            } else {
                console.error("Invalid file type provided");
                setFile(null);
            }
        } else {
            setFile(null); // 파일이 없거나 배열이 비어 있는 경우
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
            //파일이 있을경우 파일을 추가하는 코드.
            if(file){
                //저장하는 url 경로, 해당 경로는 죄가 없다.
                const locationRef = ref(
                    storage,`shullys/${user.uid}-${user.displayName}/${doc.id}`
                );
                await uploadBytes(locationRef, file).then((snapshot) => {
                    console.log("upload complete");
                });
                const fileURL = await getDownloadURL(locationRef);
                
                //fireDB에 파일 url 을 임의로 추가. json 형태로 item 명만 입력해 주는 듯.
                await updateDoc(doc.ref, {fileURL,});
            }
                setShully("");
                setFile(null);
                }catch(e){
                    console.log("posting err why: ",e);              
                } finally{
                    setLoading(false);
                }
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