import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, limit, onSnapshot, orderBy } from "firebase/firestore";
import Monolog from "../components/monolog"; // Monolog 컴포넌트 가져오기
import { 
  AttachFileInput, ModifyFileButton, ShullyWrapper, 
  ShullyColumn, ShullyPayload, ShullyUsername, EditTextArea,
  Photo, PhotoBack, DeleteButton, ButtonContainer ,ModifyButton
} from "../components/auth-Components";
import cloudeImage from "../styled/imgs/cloude.jpg";

// 스타일 정의
const MonologWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`;


// MonologPage 컴포넌트
export default function MonologPage({}) {
=

  useEffect(() => {

  });

return (
    <MonologWrapper>
      <Monolog/>
    </MonologWrapper>
);
}
