import './App.css';
import { setTimeout } from "react";
import { auth } from "./firebase";
import React, { Component } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './components/layout';
import Home from "./routes/home";
import Profile from "./routes/profile";
import CreateAccount from "./routes/createAccount";
import Login from "./routes/login";
import Content from "./routes/createContents";
import {  styled } from "styled-components";
import { GlobalStyles } from './components/auth-Components';
import LoadingScreen from './components/loadingScreen';
import ProtectedRoute from "./components/protextedRoute";

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
        path: "/createContent",
        element: <Content />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/createAccount",
    element: <CreateAccount />
  },
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
]);

const AccountCreationNotice = () => (
  <div>
    <h1>계정 생성이 비활성화되었습니다</h1>
    <p>현재 계정 생성 기능은 점검 중입니다. 점검이 완료되면 다시 시도해 주세요.</p>
    <a href="/">홈으로 돌아가기</a>
  </div>
);
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    await auth.authStateReady();
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <Wrapper className="App">
        <GlobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </Wrapper>
    );
  }
}

export default App;
