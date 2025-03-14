import React, { useState } from 'react';
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, updateDoc,arrayUnion } from "firebase/firestore";
import { PostFormWrapper, PostTextArea, PostSubmitBtn, AttachFileButton, AttachFileInput, PhotoBack } from "./auth-Components";

export default function MonologPostForm() {
    const [isLoading, setLoading] = useState(false);
    const [monolog, setMonolog] = useState("");
    const [files, setFiles] = useState([]);
    const [preview, setPreview] = useState([]); 

    const onChange = (e) => {
        setMonolog(e.target.value || "");
    };

    // 
    const onFileAttach = (e) => {
        e.preventDefault();

        const selectedFiles = Array.from(e.target.files); // 파일 배열로 변환
        // 파일 추가시 해당 파일의 이름을 보여주기. 
        const fileUrls = selectedFiles.map((file)=> ({
            name: file.name,
            fileUrl: URL.createObjectURL(file),
          }));
          setPreview((prev)=> [...prev,...fileUrls ])
      
        const categorizedFiles = selectedFiles.map(({file}) => {
            if (file.type.startsWith("image/")) {
                return { fileType: "photo", file };
            } else if (file.type.startsWith("video/")) {
                return { fileType: "video", file };
            } else {
                return { fileType: "other", file };
            }
        });
        //이전 데이터와 모든 데이터를 file에 저장.
        setFiles((prev) => [...prev, ...categorizedFiles]);
    };
  

    // ✅ Monolog 업로드
    const onSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || monolog === "" || monolog.length > 180) return;

        try {
            setLoading(true);

            //  Firestore에 Monolog 저장
            const doc = await addDoc(collection(db, "monologs"), {
                monolog,
                createdAt: Date.now(),
                username: user.displayName ||user.email.split('@')[0],
                userid: user.uid,

            });

            // 버퍼 방식, 배열로 구성할 것. -> 슬라이드 사용 위함.
            const uploadPromises = files.flatMap(async ({ fileType, file }) => {
    
                let filePath = `monologs/${user.uid}/${doc.id}/${fileType}/${file.name}`;
                const fileRef = ref(storage, filePath);
            //  await uploadBytes(fileRef, file); // 파일 업로드--> 이부분을 버퍼로 수정하기. 
                const arrayBuffer = await file.arrayBuffer();
                const uintArray = new Uint8Array(arrayBuffer);// 버퍼 생성 용량이 크지 않음.

                await uploadBytes(fileRef, uintArray); // 파일 업로드시 8진법 버퍼로 변환하여 한번에 업로드.

                const getFileUrl= await getDownloadURL(fileRef); // URL 가져오기

                // ✅ Firestore 업데이트 (파일 유형별 저장)
                await updateDoc(doc(db, "monologs", doc.id), {
                    [fileType]: arrayUnion(getFileUrl), // 동일 유형 파일의 URL 배열 저장
                });
              });

              await Promise.all(uploadPromises);

            setMonolog("");
            setFiles([]);
            setPreview([]);
            alert("Monolog이 성공적으로 업로드되었습니다.");
        } catch (e) {
            console.error("Error posting monolog:", e);
            alert("업로드 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PostFormWrapper onSubmit={onSubmit}>
            <PostTextArea
                required
                rows={5}
                maxLength={180}
                value={monolog}
                onChange={onChange}
                placeholder="What's on your mind?"
            />

            <AttachFileButton htmlFor="monologFile">
                {files.length > 0 ? `${files.length} files added ✔️` : "Add files (Photo/Video)"}
            </AttachFileButton>
            <AttachFileInput
                onChange={onFileAttach}
                type="file"
                id="monologFile"
                multiple
                accept="image/*, video/*, *.zip"
            />
            <>
            {preview.map((file, index) =>(
                <div key={index}>
                    <p>{file.name}</p>
                    {file.fileUrl && file.fileUrl.startsWith("blob:")} && (
                        <PhotoBack
                            src={file.fileUrl} alt={file.name}/>
                    )}
                </div>
            ))}
            </>

            <PostSubmitBtn
                type="submit"
                value={isLoading ? "Uploading..." : "Post Monolog"}
            />
        </PostFormWrapper>
    );
}
