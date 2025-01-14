import React, { useState } from 'react';
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { PostFormWrapper, PostTextArea, PostSubmitBtn, AttachFileButton, AttachFileInput } from "./auth-Components";

export default function MonologPostForm() {
    const [isLoading, setLoading] = useState(false);
    const [monolog, setMonolog] = useState("");
    const [files, setFiles] = useState([]);  // ✅ null → 빈 배열로 초기화

    const onChange = (e) => {
        setMonolog(e.target.value || "");
    };

    // ✅ 파일 타입 구분 및 미리보기 URL 생성
    const onFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const categorizedFiles = selectedFiles.map(file => {
            if (file.type.startsWith("image/")) {
                return { fileType: "photo", file };
            } else if (file.type.startsWith("video/")) {
                return { fileType: "video", file };
            } 
        });

        setFiles(prev => [...prev, ...categorizedFiles]);
    };

    // ✅ 파일 업로드 함수 (ArrayBuffer 사용)
    const uploadFileAsArrayBuffer = async (fileRef, file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const arrayBuffer = e.target.result;
                const fileData = new Uint8Array(arrayBuffer);

                try {
                    const uploadResult = await uploadBytes(fileRef, fileData);
                    const fileURL = await getDownloadURL(uploadResult.ref);
                    resolve(fileURL);
                } catch (error) {
                    console.error("File upload failed:", error);
                    reject(error);
                }
            };

            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
    };

    // ✅ Monolog 업로드
    const onSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || monolog === "" || monolog.length > 1800) return;

        try {
            setLoading(true);

            // ✅ Firestore에 Monolog 저장
            const docRef = await addDoc(collection(db, "monologs"), {
                monolog,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userid: user.uid,
            });

            // ✅ 파일 업로드 처리
            const uploadPromises = files.flatMap(async ({ fileType, file }) => {
                let filePath = `monologs/${user.uid}/${docRef.id}/${fileType}/${file.name}`;
                const fileRef = ref(storage, filePath);

                const fileURL = await uploadFileAsArrayBuffer(fileRef, file);

                // ✅ Firestore 업데이트 (파일 유형별 저장)
                await updateDoc(doc(db, "monologs", docRef.id), {
                    [`${fileType}`]: fileURL
                });
            });

            await Promise.all(uploadPromises);

            setMonolog("");
            setFiles([]);
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
                maxLength={1800}
                value={monolog}
                onChange={onChange}
                placeholder="What's on your mind?"
            />

            <AttachFileButton htmlFor="file">
                {files.length > 0 ? `${files.length} files added ✅` : "Add files (Photo/Video)"}
            </AttachFileButton>
            <AttachFileInput
                onChange={onFileChange}
                type="file"
                id="file"
                multiple
                accept="image/*, video/*, text/*, .zip, .rar"
            />

            <PostSubmitBtn
                type="submit"
                value={isLoading ? "Uploading..." : "Post Monolog"}
            />
        </PostFormWrapper>
    );
}
