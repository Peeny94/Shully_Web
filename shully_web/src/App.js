import './App.css';
import { setTimeout } from "react";
import {auth} from "./firebase";
import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './components/layout';
import Home from "./routes/home";
import Profile from "./routes/profile";
import CreateAccount from "./routes/createAccount";
import Login from "./routes/login";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import { useEffect } from 'react'; 
import LoadingScreen from './components/loadingScreen';
import ProtectedRoute from "./components/protextedRoute";

const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
      ),
    children:[
      {
        path:"",
        element:<Home/>,
      },
      {
        path: "profile",
        element:<Profile/>,
      },
    ],
  },
  // layout에 login form이 포함되지 않기위해 따로 경로를 지정해 준다.
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/createAccount",
    element:<CreateAccount/>
  }
]);
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
// height: 100%를 html과 body 모두에 설정해야 그라데이션이 전체 화면에 적용됩니다.
  html, body {
    margin: 0;
    padding: 0;
    height: 100%; /* html과 body 모두 높이를 설정 */
  }

  body {
    background: linear-gradient(180deg,rgba(67, 221, 216, 0.15) 0%, rgba(244, 249, 253, 0.805) 100%);
    background-attachment: scroll; /* 스크롤 시 배경 고정 */
    background-size: cover; /* 화면 전체를 덮도록 설정 */
    background-repeat: no-repeat; /* 반복 금지 */
    color: grey; /* 기본 텍스트 색상 */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;
function App() {
  const [isLoding, setLoading] = useState(true);
  const init = async () =>{
    //wait for Firebase
    await auth.authStateReady();
    // 강의와 다른점 :  window. 으로 지정을 해줘야 적용된다. 
    // window.setTimeout(() => setLoading(false),1000);
    setLoading(false);
  };
  useEffect(() => {
    init();
  },[]);
  return (
    <Wrapper className="App">
      <GlobalStyles/>
      {isLoding? <LoadingScreen/> :  <RouterProvider router={router}/>}
    </Wrapper>
    // <div>
    //   <header>
    //     세팅시작
    //   </header>
    // </div>
  );
}

export default App;
