import { styled } from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    ::-webkit-scrollbar {
        display: none; /* WebKit 기반 브라우저 */
    }
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */
`;
export const Wrapper =styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 420px;
    padding:50px 0px; 
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
        cursor:url("cursor.cur") 2 2, 
        url("cursor.png") 2 2, 
        pointer;
        &:hover {
        opacity: 0.8;
        }
    }
`; 
export const Title = styled.h1`
    font-size:  42px;   
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

export const PostFormWrapper = styled.form`
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
    background-color:rgb(250, 235, 215, 0.6);
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
}
`;
// HOME STYLE
export const HomeWrapper = styled.div`
    display: grid;
    gap: 50px;
    overflow-y: visible ;/* 스크롤 가능 scroll*/
    grid-template-rows: 1fr 5fr ;
`;

export const ShullyWrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr ;
    padding: 20px;
    width: 100%; /* 기본적으로 부모 컨테이너를 채움 */
    width: 645px; /* 고정된 가로 길이 */
    height: 200px;
    overflow: hidden; /* 내부 내용이 넘칠 경우 숨김 */
    justify-content: space-between; 
    align-self: start;
    // 거의 흰색으로 50% 뒤에 설정해 준 거.
    border :1.3px solid rgb(191, 169, 88, 0.5); 
    border-radius: 15px;
    background-color: rgba(250, 235, 215, 0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
        transform: translateY(-1px); /* 살짝 떠오르는 효과 */
        border :1.3px solid rgb(201, 180, 188);
    }
`;

export const ShullyColumn = styled.div`
    display: grid;
    gap: 30px;
    overflow-y: scroll;
    grid-template-rows: 1fr 5fr ; 
    background-color: rgba(244, 249, 253, 0.1);
    
`;
export const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 10px;
    border: 1px solid rgba(191, 169, 88, 0.5); 
    margin-top: 25px;
    &:hover {
        transform: translateY(-1px); /* 살짝 떠오르는 효과 */
        border :1.3px solid rgb(201, 180, 188, 0.5);
    }
`;

export const ShullyUsername = styled.span`
    font-weight: 600px;
    font-size: 16px;
    font-style: italic;
    color: hsl(248, 69%, 15%,0.7);
`;
export const ShullyPayload = styled.p`
    margin: 10px 0px;
    font-size: 18px;
    color: hsl(248, 69%, 15%, 0.9);
`;