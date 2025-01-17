import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  AttachFileInput, ModifyFileButton, MonologColumn,
  MonologUsername, MonologPayload, EditMoTextArea,MoHeader,
  Photo, PhotoBack, DeleteButton, ButtonMoContainer, ModifyButton, MonologWrapper
} from "../components/auth-Components";



// MonologPage 컴포넌트
export default function MonologPage({ username, mediaFiles = [], monolog, userid, id, createdAt, updatedAt }) {
  const user = auth.currentUser;

  const [isEditing, setIsEditing] = useState(false);
  const [editMonolog, setEditMonolog] = useState(monolog);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const formatDate = (createdAt) => {
    const date = new Date(Number(createdAt));
    if (isNaN(date.getTime())) return "유효하지 않은 날짜";

    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} 
            ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const updateMonolog = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const updates = { 
        monolog: editMonolog, 
        updatedAt: Date.now() 
      };

      if (file) {
        const fileType = file.type.startsWith("image/") ? "photos" : "videos";
        const newFileRef = ref(storage, `monologs/${user.uid}/${id}/${fileType}/${file.name}`);
        const uploadResult = await uploadBytes(newFileRef, file);
        const fileURL = await getDownloadURL(uploadResult.ref);

        updates[fileType] = fileURL;
      }

      await updateDoc(doc(db, "monologs", id), updates);
      setIsEditing(false);
      alert("Updated successfully.");
    } catch (error) {
      console.error("Error updating monolog:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <MonologWrapper>
      <MoHeader>
        <MonologUsername>{username}
        <p style={{ fontSize: "14px", color: "gray" }}>{formatDate(createdAt)}</p>
        </MonologUsername>
      <ButtonMoContainer>
        {user?.uid === userid && (
          <>
            {isEditing ? (
              <>
                <ModifyButton onClick={updateMonolog}>{isUploading ? "Uploading..." : "Save"}</ModifyButton>
                <ModifyFileButton htmlFor="editFile">
                  {file ? "File added ✅" : "Add File"}
                </ModifyFileButton>
                <AttachFileInput
                  onChange={handleFileChange}
                  type="file"
                  id="editFile"
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                />
              </>
            ) : (
              <ModifyButton onClick={() => setIsEditing(true)}>Edit</ModifyButton>
            )}
            <DeleteButton onClick={() => alert("삭제 기능 추가 예정!")}>Delete</DeleteButton>
          </>     
        )}
      </ButtonMoContainer>

      </MoHeader>
      <MonologColumn>
        {isEditing ? (
          <EditMoTextArea value={editMonolog} onChange={(e) => setEditMonolog(e.target.value)} onInput={handleInput} />
        ) : (   
          <MonologPayload>{monolog}</MonologPayload>
        )}
        <Photo></Photo>
      </MonologColumn>

    </MonologWrapper>
  );
}
