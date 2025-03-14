import React, { useEffect, useState } from "react";
import styled from "styled-components";
import attachfileBtn from "../styled/imgs/attachfileBtn.svg";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  AttachFileInput, ModifyFileButton, MonologColumn,
  MonologUsername, MonologPayload, EditMoTextArea,MoHeader,
  MoPhoto, MoPhotoBack, DeleteButton, ButtonMoContainer, ModifyButton, MonologWrapper, MonologImageContainer
} from "../components/auth-Components";
import Slider from "./slider-Component";



// MonologPage 컴포넌트
export default function MonologPage({id, userid,createdAt, monolog, updatedAt, username,photo }) {
  const user = auth.currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const [editMonolog, setEditMonolog] = useState(monolog);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // 메모리 누수 방지: 파일 미리보기 URL 해제
useEffect(() => {
  return () => {
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
    }
  };
}, [previewURL]);

//날짜 수정 코드
  const formatDate = (createdAt) => {
    const date = new Date(Number(createdAt));
    if (isNaN(date.getTime())) return "유효하지 않은 날짜";

    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };
  const handleAction = async (actionType) => {
    const ok = window.confirm(
        `Are you sure you want to ${actionType === "delete" ? "delete" : "edit"} this content?`
    );
    if (!ok) return;
    if (actionType === "delete") {
        try {
            const deleteTasks = [deleteDoc(doc(db, "monologs", id))];
            if (file) {
                const fileRef = ref(storage, `monologs/${user.uid}/${id}`);
                deleteTasks.push(deleteObject(fileRef));
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
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreviewURL(null);
    }
  };

  const updateMonolog = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const updates = { 
      monolog: editMonolog, 
      updatedAt: Date.now() 
    };

    if(!file){
      console.log("No file provided, updating text only.");
    } else if (file){
      try{
        console.log("File provided, uploading...");
// 기존 파일 삭제
        if (photo && file.type.startsWith("image/")) {
              const existingFileRef = ref(storage, photo);
              await deleteObject(existingFileRef);
          }
//새 파일 업로드하기
        const fileType = file.type.startsWith("image/") ? "photo" : "video";
        const newFileRef = ref(storage, `monologs/${user.uid}/${id}/${fileType}/${file.name}`);
        const uploadResult = await uploadBytes(newFileRef, file);
        const fileURL = await getDownloadURL(uploadResult.ref);
  
        updates[fileType] = fileURL;
      } catch(e) {
        console.error("Error updating monolog:", e);
      }
    };
//firesore update
      try{
        await updateDoc(doc(db, "monologs", id), updates);
        console.log("Update successful");
        setIsEditing(false);
        setFile(null);
        alert("Updated successfully.");
      } catch(e){
        console.error("Error updating content:", e);
        alert("Failed to update the content. Please try again.");  
      } finally{
        setIsUploading(false);
      };
};
  return (
    <MonologWrapper>
      <MoHeader>
        <MonologUsername>
          {username}
          <p style={{ alignContent:"flex-end",paddingLeft: "10px",fontSize: "11px", color: "gray" }}>
            {formatDate(createdAt)}
            {createdAt !== updatedAt && updatedAt && ` (Edited)` || "err"}
          </p>
        </MonologUsername>
        <ButtonMoContainer>
          {user?.uid === userid && (
            <>
              {isEditing ? (
                <>
                  <ModifyButton onClick={updateMonolog}>
                    {isUploading ? "Uploading..." : "Save"}
                  </ModifyButton>
                  <ModifyFileButton htmlFor="editMoFile">
                    {file ? "File added ✅" :
                                    <MenuItem className="shully-icon" style={{ backgroundImage: `url(${shullyIcon})` }}></MenuItem>
                    }
                  </ModifyFileButton>
                  <AttachFileInput
                    onChange={handleFileChange}
                    type="file"
                    id="editMoFile"
                    accept="image/*,video/*, *.zip"
                    style={{ display: "none" }}
                  />
                </>
              ) : (
                <ModifyButton onClick={() => setIsEditing(true)}>Edit</ModifyButton>
              )}
              <DeleteButton onClick={() => handleAction("delete")}>Delete</DeleteButton>
            </>     
          )}
        </ButtonMoContainer>
      </MoHeader>

      <MonologColumn>
        {isEditing ? (
          <EditMoTextArea 
            value={editMonolog} 
            onChange={(e) => setEditMonolog(e.target.value)} 
            onInput={handleInput} 
          />
        ) : (   
          <>
          <MonologPayload>{monolog}</MonologPayload>
          <MonologImageContainer>
            {previewURL ? (
              <MoPhoto src={previewURL} alt="Preview" />
            ) : (
              <MoPhotoBack />
            )}
          </MonologImageContainer>
        </>
        )}
      </MonologColumn>
    </MonologWrapper>
  );
}