import './styled/App.css';
import { auth } from "./firebase";
import React, { Component, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './components/layout';
import Home from "./routes/home";
import Profile from "./routes/profile";
import CreateAccount from "./routes/createAccount";
import Login from "./routes/login";
import Content from "./routes/createContents";
import LoadingScreen from './components/loadingScreen';
import ProtectedRoute from "./components/protectedRoute";

import styles from "./styled/blockPage.module.css";
import { styled } from "styled-components";
import { GlobalStyles, Wrapper } from './components/auth-Components';
import shullyIcon from "./styled/imgs/shullyStand.svg";
import Monolog from './components/monologForm';

const AccountCreationDisabled = true; // 계정 생성 차단 여부 플래그

const AccountCreationNotice = () => (
  <div className={styles.blockPage}>
    <h1>계정 생성이 비활성화되었습니다</h1>
    <p>현재 계정 생성 기능은 점검 중입니다. 점검이 완료되면 다시 시도해 주세요.</p>
    <a href="/">login 화면으로 돌아가기</a>
  </div>
);

const LoginPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  background: 
    linear-gradient(180deg, rgba(67, 221, 216, 0.15) 0%, rgba(244, 249, 253, 0.805) 100%), /* 배경색 그라데이션 */
    url(${({ image }) => image}) no-repeat 90% 90%; /* 배경 이미지 */
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "monolog",
        element: <Monolog/>,
      },
      {
        path: "/createContents",
        element: <Content />
      },
    ]
  },
  // 계정 생성 및 로그인 차단 기능 추가. 배포 전 추가 유입 금지.(혹시나)
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/createAccount",
    element: AccountCreationDisabled ? (
      <AccountCreationNotice />
    ) : (
      <CreateAccount />
    ),
  },
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
]);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.init();
    this.preventDragAndDrop();  // 🔥 드래그 앤 드롭 방지 추가
  }

  // Firebase 초기화
  init = async () => {
    await auth.authStateReady();
    this.setState({ isLoading: false });
  };

  // 🔒 드래그 앤 드롭 방지 함수
  preventDragAndDrop = () => {
    const preventDrag = (e) => e.preventDefault();

    window.addEventListener("dragstart", preventDrag);  // 드래그 시작 방지
    window.addEventListener("drop", preventDrag);       // 드롭 방지

    // 컴포넌트가 해제될 때 리스너 제거
    window.addEventListener("beforeunload", () => {
      window.removeEventListener("dragstart", preventDrag);
      window.removeEventListener("drop", preventDrag);
    });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <LoginPageWrapper className="App" image={shullyIcon}>
        <GlobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </LoginPageWrapper>
    );
  }
}

export default App;
