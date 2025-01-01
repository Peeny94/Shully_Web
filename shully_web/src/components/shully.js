import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { 
    AttachFileInput,AttachFileButton,
    ShullyWrapper, 
    ShullyColumn, 
    ShullyPayload, 
    ShullyUsername, 
    Photo, 
    PhotoBack, 
    DeleteButton, 
    ButtonContainer 
} from "./auth-Components";
import cloudeImage from "../imgs/cloude.jpg";
import { deleteDoc, doc, updateDoc} from "firebase/firestore";
import { deleteObject, ref,getDownloadURL, uploadBytes } from "firebase/storage";

export default function Shully({ username, photo, shully, userid, id }) {
    const user = auth.currentUser;

    // 상태 선언
    const [isEditing, setIsEditing] = useState(false);
    const [editShully, setEditShully] = useState(shully);
    const[file, setFile] = useState(null);
    const onFileChange = (e) => {
        // ts 타입 검증 대체 코드, {files} 로 직접적인 값으로 if문 작성 대신 변수값 자체에 반복문 결과를 저장해줌.
        const file = e.target.files?.[0] || null; // 파일 변수값을 확인.
        setFile(file instanceof File ? file : null); // 파일이면 저장, 아니면 상태 초기화
    };
    const handleAction = async (actionType) => {
        const ok = window.confirm(
            `Are you sure you want to ${actionType === "delete" ? "delete" : "edit"} this content?`
        );
        if (!ok) return;

        if (actionType === "delete") {
            try {
                const deleteShully = [];
                // Firestore 문서 삭제
                deleteShully.push(deleteDoc(doc(db, "shullys", id)));
                // Storage 파일 삭제 (있는 경우에만)
                if (photo) {
                    const photoRef = ref(storage, `shullys/${user.uid}/${id}`);
                    deleteShully.push(deleteObject(photoRef));
                }

                await Promise.all(deleteShully);
                alert("Content deleted successfully.");
            } catch (e) {
                console.error("Error deleting content:", e);
                alert("Failed to delete content. Please try again.");
            }
        } else if (actionType === "modify") {
            setIsEditing(true);
        }
    };

    const updateShully = async (e) => {
        e.preventDefault();
        try {
            const editShully =[];
            await updateDoc(doc(db, "shullys", id), {
                shully: editShully,
            });
            if(file){
                const locationRef = ref(
                    storage,`shullys/${user.uid}-${user.displayName}/${doc.id}`
                );
                const uploadResult = await uploadBytes(locationRef, file);
                    console.log("upload complete");
                const photoURL = await getDownloadURL(uploadResult.ref);            
                await updateDoc(doc, {
                    photo: photoURL,
                    // createdAt: timeStamp,
            });}
            alert("Content updated successfully.");
            setIsEditing(false);
        } catch (e) {
            console.error("Error updating content:", e);
            alert("Failed to update content. Please try again.");
        }
    };

    return (
        <ShullyWrapper>
            <ShullyColumn>
                <ShullyUsername>{username}</ShullyUsername>
                {isEditing ? (
                    <textarea
                        value={editShully}
                        onChange={(e) => setEditShully(e.target.value)}
                        rows="3"
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "10px",
                            border: "1px solid rgb(191, 169, 88)",
                        }}
                    />
                ) : (
                    <ShullyPayload>{shully}</ShullyPayload>
                )}
            </ShullyColumn>
            <ShullyColumn>
                {photo ? (
                    <Photo src={photo} alt="Uploaded Photo" />
                ) : (
                    <PhotoBack src={cloudeImage} />
                )}
            </ShullyColumn>

            <ButtonContainer>
    {user?.uid === userid && (
        <>
            {isEditing ? (
                <>
                    <DeleteButton onClick={updateShully}>Save</DeleteButton>

                    {/* 파일 업로드 버튼 */}
                    <AttachFileButton htmlFor="file" value= {file ? "Photo added ✅" : "Add Photo"}>
                        
                    </AttachFileButton>
                    <AttachFileInput
                        onChange={onFileChange}
                        type="file"
                        id="file"
                        accept="image/*"
                        style={{ display: "none" }} // 숨김 처리
                    />
                </>
            ) : (
                <DeleteButton onClick={() => handleAction("modify")}>Edit</DeleteButton>
            )}
            <DeleteButton onClick={() => handleAction("delete")}>Delete</DeleteButton>
        </>
    )}
</ButtonContainer>
        </ShullyWrapper>
    );
}
