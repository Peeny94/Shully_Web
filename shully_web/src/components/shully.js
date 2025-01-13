import React, { useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { 
    AttachFileInput, ModifyFileButton, ShullyWrapper, 
    ShullyColumn, ShullyPayload, ShullyUsername, EditTextArea,
    Photo, PhotoBack, DeleteButton, ButtonContainer ,ModifyButton
} from "./auth-Components";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, getDownloadURL, uploadBytes } from "firebase/storage";

export default function Shully({ username, photo, shully, userid, id,createdAt,updatedAt }) {
    const user = auth.currentUser;

    const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
    const [editShully, setEditShully] = useState(shully); // 텍스트 상태
    const [file, setFile] = useState(null); // 새로 업로드된 파일 상태
    const [previewURL, setPreviewURL] = useState(photo); // 파일 미리 보기 URL
    
    const formatDate = (createdAt) => {
        if (!createdAt) return "날짜 없음";

        const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
      
        const year = date.getFullYear(); 
        const month = String(date.getMonth() + 1).padStart(2, '0');  // 월 (+1 필요, 0부터 시작)
        const day = String(date.getDate()).padStart(2, '0'); // 일 (01~31)한 자리 수일 때 앞에 0 추가 (01, 02, ...)
        const hours = String(date.getHours()).padStart(2, '0');      // 시 (00~23)
        const minutes = String(date.getMinutes()).padStart(2, '0');  // 분 (00~59)
        const seconds = String(date.getSeconds()).padStart(2, '0');  // 초 (00~59)
      
        // "YYYY.MM.DD" 형태로 반환
        return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
      };
    const handleAction = async (actionType) => {
        const ok = window.confirm(
            `Are you sure you want to ${actionType === "delete" ? "delete" : "edit"} this content?`
        );
        if (!ok) return;
    
        if (actionType === "delete") {
            try {
                const deleteTasks = [deleteDoc(doc(db, "shullys", id))];
                if (photo) {
                    const photoRef = ref(storage, `shullys/${user.uid}/${id}`);
                    deleteTasks.push(deleteObject(photoRef));
                }
                await Promise.all(deleteTasks);
                alert("Content deleted successfully.");
            } catch (e) {
                console.error("Error deleting content:", e);
                alert("Failed to delete content. Please try again.");
            }
        } else if (actionType === "modify") {
            setIsEditing(true);
        }
    };
    const handleInput = (e) => {
        e.target.style.height = "auto"; // 높이 초기화
        e.target.style.height = `${e.target.scrollHeight}px`; // 동적으로 높이 설정
    };
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0] || null;
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewURL(URL.createObjectURL(selectedFile)); // 파일 미리 보기 URL 생성
        } else {
            setFile(null);
            setPreviewURL(photo); // 기존 사진으로 복원
        }
    };
    const [isUploading, setIsUploading] = useState(false);

    const updateShully = async (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지
        setIsUploading(true); // 업로드 상태 시작
        const updates = { 
            shully: editShully,
            // updatedAt: serverTimestamp()
            updatedAt: Date.now()
         };
    
        if (!file) {
            console.log("No file provided, updating text only.");
        } else if (file) {
            try {
                console.log("File provided, uploading...");
    
                // 기존 파일 삭제
                if (photo) {
                    const existingFileRef = ref(storage, photo);
                    await deleteObject(existingFileRef);
                }
    
                // 새 파일 업로드
                const newFileRef = ref(storage, `shullys/${user.uid}/${id}`);
                const uploadResult = await uploadBytes(newFileRef, file);
                const photoURL = await getDownloadURL(uploadResult.ref);
    
                updates.photo = photoURL; // 파일 URL 추가
            } catch (e) {
                console.error("Error uploading file:", e);
                alert("Failed to upload the file. Please try again.");
                setIsUploading(false); 
                return; // 에러 발생 시 중단
            }
        }
    
        // Firestore 업데이트
        try {
            await updateDoc(doc(db, "shullys", id), updates);
            console.log("Update successful");
    
            // 업데이트 성공 후 화면에 즉시 반영
            setIsEditing(false); // 편집 모드 종료
            setPreviewURL(updates.photo || photo); // 새로운 사진 URL 또는 기존 사진 설정
            setFile(null); // 파일 상태 초기화
            alert("Content updated successfully.");
        } catch (e) {
            console.error("Error updating content:", e);
            alert("Failed to update the content. Please try again.");           
        }finally {
            setIsUploading(false); // 업로드 상태 종료
        }
    };
    return (
        <ShullyWrapper>
            <ShullyColumn>
                <ShullyUsername>{username}
                    <p 
                    style={{ fontSize: "14px", color: "gray" }}>
                        {formatDate(createdAt)}
                        {createdAt !== updatedAt && updatedAt && `(Edited)`}
                        {/* <p>{createdAt !== updatedAt && updatedAt && `(Edited: ${formatDate(updatedAt)})`}
                        </p> */}
                    </p>
                </ShullyUsername>
                {isEditing ? (
                    <EditTextArea 
                        value={editShully}
                        onChange={(e) => setEditShully(e.target.value)}
                        onInput={handleInput}
                    />
                ) : (
                    <ShullyPayload>{shully}</ShullyPayload>
                )}
            </ShullyColumn>
            <ShullyColumn>
                {/* 미리 보기 이미지 또는 기존 사진 표시 */}
                {previewURL ? (
                    <Photo src={previewURL} alt="Preview" />
                ) : (
                    <PhotoBack />
                )}
            </ShullyColumn>

            <ButtonContainer>
                {user?.uid === userid && (
                    <>
                        {isEditing ? (
                            <>
                                <ModifyButton onClick={updateShully}>
                                {isUploading ? "Uploading..." : "Save"}
                                </ModifyButton>
                                <ModifyFileButton htmlFor="editFile">
                                    {file ? "Photo added ✅" : "Add Photo"}
                                </ModifyFileButton>  
                                <AttachFileInput
                                    onChange={handleFileChange}
                                    type="file"
                                    id="editFile"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                            </>
                        ) : (
                            <ModifyButton onClick={() => setIsEditing(true)}>Edit</ModifyButton>
                        )}
                        <DeleteButton onClick={() => handleAction("delete")}>Delete</DeleteButton>
                    </>
                )}
            </ButtonContainer>
        </ShullyWrapper>
    );
}
