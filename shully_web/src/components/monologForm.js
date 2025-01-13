import React, { useState } from 'react';
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { serverTimestamp, addDoc, collection, updateDoc } from "firebase/firestore";
import { PostFormWrapper, PostTextArea, PostSubmitBtn, AttachFileButton, AttachFileInput } from "./auth-Components";
// 모놀로그 글 작성 및 경로 생성
export default function MonologPostForm() {
    const [isLoading, setLoading] = useState(false);
    const [monolog, setMonolog] = useState("");
    const [files, setFiles] = useState([]);
    const [previewURLs, setPreviewURLs] = useState([]);

    const onChange = (e) => {
        setMonolog(e.target.value || "");
    };

    // ✅ 파일 타입 구분 및 미리보기 URL 생성
    const onFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const categorizedFiles = selectedFiles.map(file => {
            const previewURL = URL.createObjectURL(file);

            if (file.type.startsWith("image/")) {
                return { fileType: "photo", file, previewURL };
            } else if (file.type.startsWith("video/")) {
                return { fileType: "video", file, previewURL };
            } else {
                return { fileType: "novel", file, previewURL };
            }
        });

        setFiles(prev => [...prev, ...categorizedFiles]);
        setPreviewURLs(prev => [...prev, ...categorizedFiles.map(item => item.previewURL)]);
    };

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

    const onSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || monolog === "" || monolog.length > 1800) return;

        try {
            setLoading(true);

            const docRef = await addDoc(collection(db, "monologs"), {
                monolog,
                createdAt: serverTimestamp(),
                username: user.displayName || "Anonymous",
                userid: user.uid,
            });

            const uploadPromises = files.map(async ({ fileType, file }) => {
                let filePath = "";

                if (fileType === "photo") {
                    filePath = `monologs/${user.uid}/${docRef.id}/photos/${file.name}`;
                } else if (fileType === "video") {
                    filePath = `monologs/${user.uid}/${docRef.id}/videos/${file.name}`;
                } else {
                    filePath = `monologs/${user.uid}/${docRef.id}/novels/${file.name}`;
                }

                const fileRef = ref(storage, filePath);
                const fileURL = await uploadFileAsArrayBuffer(fileRef, file);

                await updateDoc(docRef, {
                    [`${fileType}`]: fileURL
                });
            });

            await Promise.all(uploadPromises);

            previewURLs.forEach(url => URL.revokeObjectURL(url));

            setMonolog("");
            setFiles([]);
            setPreviewURLs([]);
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
                {files.length > 0 ? `${files.length} files added ✅` : "Add files (Photo/Video/Novel)"}
            </AttachFileButton>
            <AttachFileInput
                onChange={onFileChange}
                type="file"
                id="file"
                multiple
                accept="image/*, video/*, application/pdf, .zip, .rar"
            />

            {previewURLs.length > 0 && previewURLs.map((url, index) => {
                const fileType = files[index]?.fileType;
                return (
                    <div key={index} style={{ marginTop: "10px" }}>
                        {fileType === "photo" ? (
                            <img src={url} alt="Preview" style={{ width: "200px", height: "auto", borderRadius: "10px" }} />
                        ) : fileType === "video" ? (
                            <video src={url} controls style={{ width: "200px", borderRadius: "10px" }} />
                        ) : (
                            <p>Novel file uploaded</p>
                        )}
                    </div>
                );
            })}

            <PostSubmitBtn
                type="submit"
                value={isLoading ? "Uploading..." : "Post Monolog"}
            />
        </PostFormWrapper>
    );
}
