import { styled } from "styled-components";
import React from "react";
import { createGlobalStyle } from "styled-components";
import cloudeImage from "../styled/imgs/cloude.jpg";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
    box-sizing: border-box;
    }
    ::-webkit-scrollbar {
        display: none; /* WebKit 기반 브라우저 */
    }
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */

    body {
        margin: 0;
        padding: 0;
        font-family: 'Arial', sans-serif;
        background: linear-gradient(180deg, rgba(67, 221, 216, 0.15) 0%, rgba(244, 249, 253, 0.805) 100%);
        /* background-size: cover; */
        overflow-x: hidden; /* 수평 스크롤 제거 */
    }
`;
export const Wrapper =styled.div`
    height: 90%;
    display: flex;
    justify-content: center;
    width: 1020px;
    padding:50px 50px; 
`;
export const LayoutWrapper =styled.div`
    height: 90%;
    display: flex;
    justify-content: center;
    width: 1020px;
    padding:50px 50px; 
`;
export const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100px;
    
`;
export const Input = styled.input`
    padding: 10px 20px; 
    border-radius: 50px;
    border: rgb(33, 83, 83);
    background-size: cover;
    background-color: rgb(157, 217, 217);
    // background-image:url("cloud.jpg");
    width: 300%; //강의와 다른 설정 (<-100)
    outline-color: rgb(191, 169, 88);
    font-size:16px;
    &[type="submit"] {
        cursor:url(${cloudeImage}) 2 2, 
        url("cursor.png") 2 2, 
        pointer;
        &:hover {
        opacity: 0.8;
        }
    }
`; 
export const LoginButton = styled.button`
// all: unset; /* 기본 스타일 제거 */
  display: inline-block; /* 레이아웃 정렬 */
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  background-color: rgb(157, 217, 217);
  outline-color: rgb(191, 169, 88);
  font-size: 16px;
  width: 71.5%;
  cursor: pointer;
    &:hover {
    opacity: 0.8;
    border-color: rgb(191, 169, 88); /* 호버 시 변경 */
    }
`;
// export const CreateAccountBtn = styled.button`
//   margin-top: 20px;
//   background-color: rgb(157, 217, 217);
//   font-weight: 300;
//   width: 40%;
//   color: black;
//   padding: 10px 20px;
//   border-radius: 50px;
//   border: 0;
//   display: inline-block;
//   gap: 5px;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.8;
//   }
// `;

// export const GithubBtn = styled.button`
//   margin-top: 20px;
//   background-color: rgb(157, 217, 217);
//   font-weight: 300;
//   width: 40%;
//   color: black;
//   padding: 10px 20px;
//   border-radius: 50px;
//   border: 0;
//   display: inline-block;
//   gap: 5px;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.8;
//   }
// `;
export const LoginInput = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: rgb(191, 169, 88);
    background-size: cover;
    background-color: rgb(157, 217, 217);
    width: 340%; //강의와 다른 설정 (<-100)
    font-size:16px;
    &:focus {
        background-color: rgba(157, 217, 217, 0.6); /* 포커스 시 배경색 변경 */
        border-color: rgba(191, 169, 88, 0.18); /* 포커스 시 테두리 색 변경 */
        transition: background-color 0.3s ease, border-color 0.3s ease; /* 부드러운 전환 */
    }
    &[type="submit"] {
        cursor:url(${cloudeImage}) 2 2, 
        url("cursor.png") 2 2, 
        pointer;
        &:hover {
        opacity: 0.8;
        color: black;
        background-color: rgba(157, 217, 217,0.9);
        }
    }

`;
export const Title = styled.h1`
    font-size:  42px;   
`;
const BaseText = styled.h1`
  color: rgba(157, 217, 217, 0.7);
  text-align: justify;
  position: relative;
  white-space: pre-line;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const LoginTitle = styled(BaseText)`
  font-size: 42px;
  padding-left: 20px;
`;

export const ShullyText = styled(BaseText)`
  font-family: 'Dancing Script', cursive;
  font-size: 60px;
  padding-left: 100px;

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;
export const Error = styled.span`
    font-weight:600;
    color: tomato;
`;

export const Switcher = styled.span`
    margin-top: 20px;
    a{
    color: rgb(157, 217, 217);
    }
`;

// HOME STYLE

export const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch; /* 자식 요소가 부모의 너비/높이에 맞춤 */
    justify-content: flex-start; /* 내용이 위쪽에 정렬 */
    /* justify-content: center;  수평 중앙 정렬 */
    align-items: center; 
    gap: 20px;
    padding: 10px; /* 내부 여백 추가 */
    box-sizing: border-box; /* 패딩 포함 크기 계산 */
    // margin: 20px 0; /* Wrapper 요소 사이의 외부 여백 */
    overflow-y: auto; /* 세로 스크롤 활성화 */
        /* 스크롤바 스타일 */
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;
export const PostFormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
`;
export const ContentFormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
// Textarea 에는 박스 크기 조절 기능이 기본적으로 있다.
export const PostTextArea = styled.textarea`
    border: 2px solid rgb(191, 169, 88, 0.5);
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: black;
    background-color:rgb(255, 245, 250, 0.8);
    width: 100%;
    resize:none;
    &::placeholder{
        font-size: 1;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    &:focus {
        outline: none;
        border-color:rgb(191, 169, 88);
    }
`;

export const EditTextArea = styled.textarea`
    border: 2px solid rgba(191, 169, 88, 0.5);
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: black;
    background-color: rgba(255, 245, 250, 0.8);
    width: 95%;
    resize: none;
    min-height: 40px; /* 최소 높이 */
    max-height: 170px; /* 최대 높이 */
    height: auto;
    overflow: hidden; /* 스크롤 막기 */
    box-sizing: border-box; /* 패딩 포함 높이 계산 */
    &::placeholder {
        font-size: 1rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    &:focus {
        outline: none;
        border-color: rgb(191, 169, 88);
    }
`;
export const AttachFileButton =styled.label`
    background-color: rgb(127, 217, 207);
    padding: 10px 0px;
    color: white;
    text-align: center;
    border-radius: 20px;
    border: 1px solid rgb(127, 217, 207);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    &:hover,
    &:active{
        opacity: 0.9;
    }
`;


export const AttachFileInput = styled.input`
    display: none;
`;
export const PostSubmitBtn = styled.input`
    background-color: rgb(127, 217, 207);
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active{
        opacity: 0.9;
    }
`;
export const ShullyUsername = styled.span`
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
    font-style: italic;
    color:rgba(53, 130, 121);
`;
export const ShullyPayload = styled.p`
    padding: 10px;
    margin: 0px 0px;
    font-size: 18px;
    color: rgba(53, 130, 121,0.9);
    word-wrap: break-word; /* 긴 단어를 줄바꿈 */
    word-break: break-word; /* 줄바꿈 방지 단어를 강제로 줄바꿈 */
    overflow-wrap: break-word; /* 긴 텍스트 자동 줄바꿈 */
    line-height: 1.5; /* 줄 간격 조정 */
`;

export const ShullyWrapper = styled.div`
    display: grid;
    height: 100vh; 
    justify-content: center; 
    align-items: center; 
    grid-template-columns: 2fr 1fr;
    padding:15px;
    width: 70%; /* 고정된 가로 길이 */
    min-height: 280px; /* 최소 높이 */
    overflow: hidden; /* 내부 내용이 넘칠 경우 숨김 */
    // 거의 흰색으로 50% 뒤에 설정해 준 거.
    border :1px solid rgb(191, 169, 88, 0.5); 
    border-radius: 15px;
    background: linear-gradient(90deg, rgb(127, 217, 207, 0.4) 0%, rgba(244, 249, 253, 1) 100%); 
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
        transform: translateY(-1px); /* 살짝 떠오르는 효과 */
        border :1.3px solid rgb(201, 180, 188);
    }
`;

export const ShullyColumn = styled.div`
    display: grid; /* Grid 컨테이너 설정 */
    grid-template-rows: 1fr 4fr ;
    height: 220px;
    justify-items: start;
    align-items: start; 
    gap: 10px; /* 요소 간 간격 */
    border-radius: 10px;
    overflow-y: scroll;
    background-color: rgba(72, 242, 236, 0.1);
    &:last-child {
        place-self: end; 
    }
`;

//기본 이미지가 file 에서 가져온 것이고 하기는 기본 html 이미지를 넣은 거라 태그 구분이 다르다.
export const Photo = styled.img`
    width: 100%; /* 부모 컨테이너의 너비에 맞춤 */
    height: 220px; /* 부모 컨테이너의 높이에 맞춤 */
    padding: 1px 1px;
    object-fit: fit;
    border-radius: 10px;
    border: 1px solid rgba(191, 169, 88, 0.5); 
    &:hover {
        transform: translateY(-1px); /* 살짝 떠오르는 효과 */
        border :1.3px solid rgb(201, 180, 188, 0.5);
    }
`;

export const PhotoBack = styled.img`
    width: 100%; /* 부모 컨테이너의 너비에 맞춤 */
    height: 220px; /* 부모 컨테이너의 높이에 맞춤 */
    border: 4px solid rgba(191, 169, 88, 0.1); 
    border-radius: 10px;
    object-fit: scale-down; /* 이미지를 박스에 맞춤 */
    opacity: 0.2; /* 불투명도 조정 */

`;
export const MonologImageContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const MoPhoto = styled.img`
    width: 100%; /* 부모 컨테이너의 너비에 맞춤 */
    height: 220px; /* 부모 컨테이너의 높이에 맞춤 */
    padding: 1px 1px;
    object-fit: fit;
    border-radius: 10px;
    border: 1px solid rgba(191, 169, 88, 0.5); 
    &:hover {
        transform: translateY(-1px); /* 살짝 떠오르는 효과 */
        border :1.3px solid rgb(201, 180, 188, 0.5);
    }
`;

export const MoPhotoBack = styled.img`
    width: 100%; /* 부모 컨테이너의 너비에 맞춤 */
    height: 220px; /* 부모 컨테이너의 높이에 맞춤 */
    border: 4px solid rgba(191, 169, 88, 0.1); 
    border-radius: 10px;
    object-fit: scale-down; /* 이미지를 박스에 맞춤 */
    opacity: 0.2; /* 불투명도 조정 */

`;
// monolog스타일 정의
export const MoHeader = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    justify-content:right; /* 버튼을 오른쪽 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    margin-top: -10px; /* 버튼 위 여백 추가 */
    padding:2px;
`;

export const MonologUsername = styled.span`
    display: flex;
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
    font-style: italic;
    color:rgba(53, 130, 121);
`;
export const ButtonMoContainer = styled.div`
    display: flex;
    justify-content:right; /* 버튼을 오른쪽 정렬 */
    align-items: flex-start; /* 수직 가운데 정렬 */
    margin-top: -10px; /* 버튼 위 여백 추가 */
    padding:2px;
`;

export const MonologWrapper = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-rows: 1fr 4fr ;
    width: 100%; 
    min-height: 250px; 
    overflow: hidden; /* 내부 내용이 넘칠 경우 숨김 */
    padding: 20px 10px 10px;
    box-sizing: border-box;
    border :1px solid rgb(191, 169, 88, 0.1); 
    border-radius: 15px;
    background: rgba(127, 217, 207, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
        transform: translateY(-1px); /* 살짝 떠오르는 효과 */
        border :1.3px solid rgb(201, 180, 188);
        /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
    }
  
`;
export const MonologColumn = styled.div`
    display: grid; /* Grid 컨테이너 설정 */
    grid-template-rows: auto 1fr; ;
    width: 100%;
    max-width: 500px;
    height: 190px;
    justify-items: start;
    align-items: start; 
    gap: 10px; /* 요소 간 간격 */
    border-radius: 10px;
    overflow-y: auto;
    background-color: rgba(72, 242, 236, 0.1);

    /* 스크롤바 디자인 */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &:last-child {
        place-self: first; 
    }
`;
export const MonologPayload = styled.p`
    padding: 0px;
    margin: 5px 10px;
    font-size: 16px;
    color: rgba(53, 130, 121,0.9);
    word-wrap: break-word; /* 긴 단어를 줄바꿈 */
    word-break: break-word; /* 줄바꿈 방지 단어를 강제로 줄바꿈 */
    overflow-wrap: break-word; /* 긴 텍스트 자동 줄바꿈 */
    line-height: 1.5; /* 줄 간격 조정 */
    /* 🔥 두 줄까지만 표시하고 이후 내용은 스크롤 */
    max-height: 3em; /* 2줄까지만 표시 (line-height * 2) */
    overflow-y: auto;
    white-space: pre-wrap; /* 줄바꿈 적용 */
    
    /* 🔽 스크롤바 스타일 */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;

export const EditMoTextArea = styled.textarea`
    border: 2px solid rgba(191, 169, 88, 0.5);
    margin: 8px 5px;
    /* align-items: center; */
    /* justify-content: center; */
    padding: 15px 10px;
    border-radius: 20px;
    font-size: 16px;
    color: black;
    background-color: rgba(255, 245, 250, 0.8);
    width: 98%;
    resize: none;
    min-height: 20px; /* 최소 높이 */
    max-height: 220px; /* 최대 높이 */
    height: auto;
    overflow: hidden; /* 스크롤 막기 */
    box-sizing: border-box; /* 패딩 포함 높이 계산 */
    &::placeholder {
        font-size: 1rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    &:focus {
        outline: none;
        border-color: rgb(191, 169, 88);
    }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* 버튼 정렬: 왼쪽 */
  align-items: center; /* 수직 가운데 정렬 */
  gap: 5px; /* 버튼 간격 */
  margin-top: 5px;
  padding: 2px;
`;

// BUTTON component 모음.
export const BaseloginButton = styled.button`
    margin-top: -10px;
    display: inline-block;
    display: flex;
    padding: 10px 20px;
    border: none;
    border-radius: 50px;
    background-color: rgb(157, 217, 217);
    font-size: 16px;
    cursor: pointer;
    width: 200px; /* 동일한 너비 */
    height: 50px; /* 동일한 높이 */
    text-align: center;
    &:hover {
    opacity: 0.8;
    border-color: rgb(191, 169, 88); /* 호버 시 변경 */
  }
`;

export const CreateAccountBtn = styled(BaseloginButton)`
  align-items: center;
  justify-content: center;
  color: black;
`;

export const GithubBtn = styled(BaseloginButton)`
  align-items: center;
  justify-content: center;
  color: black;
  padding:10px;
  gap: 5px;
`;

// 편집 및 여러 버튼 
export const BaseeditButton = styled.button`
  font-size: 7px;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  height: 20px;
  padding:0px 10px; //버튼 크기를 동일하게 유지
  border-radius: 5px;
  cursor: pointer;
  background-color: rgba(72, 242, 236, 0.1);
  border: 1px solid rgba(72, 242, 236, 0.3);
  color: hsl(248, 69%, 15%, 0.4);
  box-sizing: border-box; /* 모든 버튼의 크기 계산을 통일 */
  &:hover {
    background-color: rgba(72, 242, 236, 0.6);
    border-color: rgba(72, 242, 236, 0.6);
  }
`;
export const DeleteButton = styled(BaseeditButton)`
  color: hsl(248, 69%, 15%, 0.6); /* Delete에 적합한 강조 색 */
`;

export const ModifyButton = styled(BaseeditButton)`
  color: hsl(248, 69%, 15%, 0.6);
`;
// export const ModifyFileButton = styled(BaseeditButton).attrs({ as: "label" })`
//   /* ModifyFileButton에 BaseeditButton의 border와 일관성 유지 */
//   display: inline-block; //label을 block처럼 처리
//   text-align: center;
//   color: hsl(248, 69%, 15%, 0.6);
//   /* background-color: #f4f4f4; */
//   background-size: 5px 5px;
//   background-image: url("../styled/imgs/attachfileBtn.svg");
// `;
export const ModifyFileButton = styled(BaseeditButton).attrs({ as: "label" })`
    cursor:pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgb(157, 217, 217, 0.7);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    svg{
        width: 30px;
        fill: rgb(157, 217, 217);
        border-color: rgb(157, 217, 217);
        }
    &:hover {
        opacity: 0.8;
        border-color: rgb(180, 169, 88, 0.5); 
        &.log-out{
            fill: rgb(157, 217, 217);
            border-color: rgb(157, 217, 217);
            svg{
                fill: brown;
            }
        } 
    }
    &.shully-icon{
        width: 50px;
        height: 50px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;       
        border-color: rgb(157, 217, 217);
        &:hover {
            opacity: 0.8;
            border-color: rgb(180, 169, 88,0.5); 
        }
    }        
`;

// 프로파일 관련 추가 컨포넌트.
export const ProfileWrapper = styled.div`
    display: grid;
    grid-template-rows: 2fr 1fr;
    gap: 20px;
    justify-items: center; /* 수평 중앙 정렬 */
    align-items: center;   /* 수직 중앙 정렬 */
    width: 100%;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;

`;
export const UserProfileImageWrapper = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    overflow: hidden;
    height: 80px;
    border-radius: 50%;
    background-color: rgba(72, 242, 206); 
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img{
        width: 100%; /* 부모 요소의 크기에 맞춤 */
        height: 100%; /* 부모 요소의 크기에 맞춤 */
        /* object-fit: cover; 이미지 비율 유지하며 영역 채우기 */
        
    }
`;
export const UserProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: fit;
    border: 2px solid #ccc;
`;

export const UserImageUpload = styled.input`
    display: none;
    width: 80px;
    overflow: hidden;
    height: 80px;
    border-radius: 50%;
    background-color:rgb(157, 217, 217); 
    cursor: pointer;

`;

export const UserProfileName = styled.span`
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    display: flex;
    flex-direction: column; /* 버튼과 입력란을 세로로 정렬 */
    align-items: center; /* 가로 정렬 중앙 */
    
`;

export const ShullyUserWrapper = styled.div`
    display: grid;
    /* height: 100vh;  */
    justify-content: center; 
    align-items: center; 
    grid-template-columns: 1fr;
    padding:15px;
    width: 70%;
    height: 400px; 
    overflow: hidden; /* 내부 내용이 넘칠 경우 숨김 */
    // 거의 흰색으로 50% 뒤에 설정해 준 거.
    border :1px solid rgb(191, 169, 88, 0.5); 
    border-radius: 15px;
    background: linear-gradient(90deg, rgb(127, 217, 207, 0.4) 0%, rgba(244, 249, 253, 1) 100%); 
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
        transform: translateY(-1px); /* 살짝 떠오르는 효과 */
        border :1.3px solid rgb(201, 180, 188);
    }
`;

export const ShullyUserColumn = styled.div`
    display: grid; /* Grid 컨테이너 설정 */
    grid-template-rows: auto 1fr auto;
    height: 350px;
    width: 100%;
    justify-items: start;
    align-items: start; 
    gap: 10px; /* 요소 간 간격 */
    border-radius: 10px;
    overflow-y: scroll;
    background-color: rgba(72, 242, 236, 0.1);
    &:last-child {
        place-self: end; 
    }
`;
export const ProfileMediaContainer = styled.div`
    position:relative;
    width: 100%;
    max-width: 600px;
    height: 220px;
    border-radius: 10px;
    border: 1px solid rgba(191, 169, 88, 0.5);
    background-color: #f2f2f2;
    overflow:hidden;
`;
// 슬라이드 전체를 감싸는 래퍼
export const SlideWrapper = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
    transform: ${({ currentSlide }) => `translateX(-${currentSlide * 100}%)`};
`;

// 개별 슬라이드 아이템
export const SlideItem = styled.div`
    min-width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
// 슬라이드 좌우 버튼
export const SlideButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;

    ${({ direction }) => direction === "left" && `left: 10px;`}
    ${({ direction }) => direction === "right" && `right: 10px;`}
`;

export const ProfilePhoto = styled.img`
    width: 95%; /* 부모 컨테이너의 너비에 맞춤 */
    height: 220px; /* 부모 컨테이너의 높이에 맞춤 */
    padding: 5px 5px;
    margin-left: 5px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid rgba(191, 169, 88, 0.5); 
    &:hover {
        transform: translateY(-1px); /* 살짝 떠오르는 효과 */
        border :1.3px solid rgb(201, 180, 188, 0.5);
    }
`;
export const ProfileVideo = styled.video`
    width: 95%;               /* 부모 요소에 꽉 차게 */
    height: 220px;             /* 고정 높이 */
    padding: 5px 5px;
    object-fit: cover;         /* 비율 유지 + 꽉 채움 */
    border-radius: 10px;       /* 둥근 모서리 */
    border: 1px solid rgba(191, 169, 88, 0.5);
    transition: transform 0.3s ease, border 0.3s ease; 
    &:hover {
        transform: translateY(-1px); /* 살짝 떠오르는 효과 */
        border :1.3px solid rgb(201, 180, 188, 0.5);
    }
`;
// 뭘 수정하든 이 인풋을 짦은 타이틀이나 제목 부제목 등등 지을 때 쓰자!
export const ModifyInput = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: 1px rgba(72, 242, 236, 0.1);
    background-color: rgba(157, 217, 217, 0.1);
    width: 20ch; /* 20글자 크기에 적합한 너비 */
    max-width: 300px;
    margin: 5px auto;
    font-size: 16px;
    text-align: left;
    box-sizing: border-box;
    &:hover {
        background-color: rgba(72, 242, 236, 0.1);
        border-color: rgba(72, 242, 236, 0.5);
    }
`;
export const ModifyNameBtn = styled.button`
${reset}
    font-size: 8px;
    font-weight: 300;
    text-transform: uppercase;
    text-align: center;
    /* padding: 3px 6px; */
    border-radius: 5px;
    cursor: pointer;
    background-color: rgba(72, 242, 236, 0.1);
    border: 1px solid rgba(72, 242, 236, 0.3);
    color: hsl(248, 69%, 15%, 0.4);
    &:hover {
        background-color: rgba(72, 242, 236, 0.2);
        border-color: rgba(72, 242, 236, 0.6);
    }
`;

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2
export const PagePreview = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 800px;

        .page {
            background: rgba(231, 204, 107, 0.5);
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 100%;
            height: 1122px; /* A4 크기 기준 */
            overflow: hidden; /* 스크롤 제거 */
            
            /* 자동 줄바꿈 */
            white-space: pre-wrap; /* 줄바꿈 포함하여 출력 */
            word-wrap: break-word; /* 단어가 너무 길면 줄바꿈 */
            overflow-wrap: break-word; /* 최신 브라우저에서 긴 단어 줄바꿈 */
            
            font-family:Arial, Helvetica, sans-serif;
            font-size: 14px;
        }

        h2 {
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: bold;
        }

        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow-wrap: break-word;
            font-family:Arial, Helvetica, sans-serif;
            font-size: 14px;
        }
`;

export const AttachContentsButton =styled.label`
    background-color: rgb(127, 217, 207);
    padding: 10px 0px;
    color: white;
    text-align: center;
    border-radius: 20px;
    border: 1px solid rgb(127, 217, 207);
    font-size: 10px;
    font-weight: 600;
    cursor: pointer;
    &:hover,
    &:active{
        opacity: 0.9;
    }
`;


export const AttachContentsInput = styled.input`
    display: none;
`;