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
  *{
    
    box-sizing: border-box;
  }
  body {
    background-color: whitesmoke;
    color:grey;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`
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
