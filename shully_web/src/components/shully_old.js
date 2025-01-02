import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { 
    AttachFileInput, AttachFileButton, ShullyWrapper, 
    ShullyColumn, ShullyPayload, ShullyUsername, 
    Photo, PhotoBack, DeleteButton, ButtonContainer 
} from "./auth-Components";
import { ref as storageRef, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { ref, update, getDatabase } from "firebase/database";

export default function Shully({ username, photo, shully, userid, id }) {
    const user = auth.currentUser;

    // 상태 선언
    const [isEditing, setIsEditing] = useState(false);
    const [editShully, setEditShully] = useState(shully);
    const [file, setFile] = useState(null);

    const onFileChange = (e) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile instanceof File ? selectedFile : null);
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
            } catch (error) {
                console.error("Error deleting content:", error);
                alert("Failed to delete content. Please try again.");
            }
        } else if (actionType === "modify") {
            setIsEditing(true);
        }
    };
    // 콘텐츠 업데이트 핸들러
    const onUpdate = async (e) => {
        e.preventDefault();
        const db = getDatabase();

        try {
            // 업데이트 데이터 준비
            const updateData = { shully: editShully };
            if (file) {
                // 파일 업로드 처리
                const filePath = `shullys/${user.uid}/${id}`;
                const fileStorageRef = storageRef(storage, filePath);
                const uploadResult = await uploadBytes(fileStorageRef, file);
                const photoURL = await getDownloadURL(uploadResult.ref);

                updateData.photo = photoURL; // 업데이트 데이터에 photoURL 추가
            }

            // Realtime Database에 업데이트
            const updateShully = {};
            updateShully[`/shullys/${user.uid}/${id}`] = updateData;
            await update(ref(db), updateShully);

            alert("Content updated successfully.");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating content:", error);
            alert("Failed to update content. Please try again.");
        }
    };

    const removePhoto = async () => {
        if (!photo) return;
        const ok = window.confirm("Are you sure you want to delete the photo?");
        if (!ok) return;

        try {
            const filePath = `shullys/${user.uid}/${id}`;
            const fileStorageRef = storageRef(storage, filePath);
            await deleteObject(fileStorageRef);

            const db = getDatabase();
            const updateShully = {};
            updateShully[`/shullys/${user.uid}/${id}/photo`] = null;
            await update(ref(db), updateShully);

            alert("Photo removed successfully.");
        } catch (error) {
            console.error("Error removing photo:", error);
            alert("Failed to remove photo. Please try again.");
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
                    <PhotoBack />
                )}
            </ShullyColumn>

            <ButtonContainer>
                {user?.uid === userid && (
                    <>
                        {isEditing ? (
                            <>
                                <DeleteButton onClick={onUpdate}>Save</DeleteButton>
                                <AttachFileButton htmlFor="file">
                                    {file ? "Photo added ✅" : "Add Photo"}
                                </AttachFileButton>
                                <AttachFileInput
                                    onChange={onFileChange}
                                    type="file"
                                    id="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                                {photo && (
                                    <DeleteButton onClick={removePhoto}>
                                        Remove Photo
                                    </DeleteButton>
                                )}
                            </>
                        ) : (
                            <DeleteButton onClick={() => setIsEditing(true)}>Edit</DeleteButton>
                        )}
                        <DeleteButton onClick={() => handleAction("delete")}>Delete</DeleteButton>
                    </>
                )}
            </ButtonContainer>
        </ShullyWrapper>
    );
}
