import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  AttachFileInput, ModifyFileButton, MonologColumn,
  MonologUsername, MonologPayload, EditMoTextArea,
  Photo, PhotoBack, DeleteButton, ButtonContainer, ModifyButton, MonologWrapper
} from "../components/auth-Components";


// ✅ 슬라이드 버튼 스타일
const SliderWrapper = styled.div`
  position: relative;
  width: 50px;
  max-width: 50px;
  /* overflow: hidden; */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Slide = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.translate}%);
`;

const Media = styled.div`
  min-width: 50px;
  height: 30px;
  background-color: #f4f4f4;

  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  ${(props) => (props.left ? "left: 10px;" : "right: 10px;")}
`;

// 📸 슬라이드 컴포넌트
const MediaSlider = ({ mediaFiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaFiles.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === mediaFiles.length - 1 ? 0 : prev + 1));
  };

  return (
    <SliderWrapper>
      <Slide translate={-currentIndex * 100}>
        {mediaFiles.map((file, index) => (
          <Media key={index}>
            {file.type === "photo" ? (
              <img src={file.url} alt={`Slide ${index}`} />
            ) : (
              <video src={file.url} controls />
            )}
          </Media>
        ))}
      </Slide>
      {mediaFiles.length > 1 && (
        <>
          <ArrowButton left onClick={prevSlide}>
            <FaArrowLeft />
          </ArrowButton>
          <ArrowButton onClick={nextSlide}>
            <FaArrowRight />
          </ArrowButton>
        </>
      )}
    </SliderWrapper>
  );
};


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
      const updates = { monolog: editMonolog, updatedAt: Date.now() };

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
      <MonologColumn>
        <MonologUsername>{username}
        <p style={{ fontSize: "14px", color: "gray" }}>{formatDate(createdAt)}</p>
        </MonologUsername>
        {isEditing ? (
          <EditMoTextArea value={editMonolog} onChange={(e) => setEditMonolog(e.target.value)} onInput={handleInput} />
        ) : (   
          <MonologPayload>{monolog}</MonologPayload>
        )}
        
        <ButtonContainer>
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
      </ButtonContainer>
      <Photo></Photo>
      </MonologColumn>
    </MonologWrapper>
  );
}
