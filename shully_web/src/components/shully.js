import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { 
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
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export default function Shully({ username, photo, shully, userid, id }) {
    const user = auth.currentUser;

    // 상태 선언
    const [isEditing, setIsEditing] = useState(false);
    const [editShully, setEditShully] = useState(shully);

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
            await updateDoc(doc(db, "shullys", id), {
                shully: editShully,
            });
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
                            <DeleteButton onClick={updateShully}>Save</DeleteButton>
                        ) : (
                            <DeleteButton onClick={() => handleAction("modify")}>
                                Edit
                            </DeleteButton>
                        )}
                        <DeleteButton onClick={() => handleAction("delete")}>
                            Delete
                        </DeleteButton>
                    </>
                )}
            </ButtonContainer>
        </ShullyWrapper>
    );
}
