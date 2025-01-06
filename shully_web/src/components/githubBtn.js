import React, { Component } from "react";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import cloudelogo from "../styled/imgs/cloude.svg";

const Botton = styled.span`
  margin-top: 20px;
  background-color: rgb(157, 217, 217);
  font-weight: 300;
  width: 40%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: inline-block;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Log = styled.img`
  height: 25px;
`;

const MessageWrapper = styled.div`
  margin-top: 20px;
  color: red;
  font-size: 14px;
  text-align: center;
`;

class GithubButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    // 계정생성 비활성화. 생명주기 함수로 급하게 막음. 
      isBlocked: true,
      errorMessage: "",
    };
  }

  componentDidMount() {
    const { AccountCreationDisabled } = this.props;

    if (AccountCreationDisabled) {
      this.setState({
        isBlocked: true,
        errorMessage: "계정 생성이 비활성화되었습니다. 점검 후 다시 시도해 주세요.",
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { AccountCreationDisabled } = this.props;

    if (prevProps.AccountCreationDisabled !== AccountCreationDisabled) {
      this.setState({
        isBlocked: AccountCreationDisabled,
        errorMessage: AccountCreationDisabled
          ? "계정 생성이 비활성화되었습니다. 점검 후 다시 시도해 주세요."
          : "",
      });
    }
  }

  onClick = async () => {
    const { isBlocked } = this.state;

    if (isBlocked) {
      alert("계정 생성이 비활성화되었습니다.");
      return;
    }

    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      alert("로그인 성공!");
    } catch (error) {
      console.error(error);
      this.setState({ errorMessage: "로그인 중 오류가 발생했습니다. 다시 시도해 주세요." });
    }
  };

  render() {
    const { isBlocked, errorMessage } = this.state;

    return (
      <div>
        <Botton onClick={this.onClick} disabled={isBlocked}>
          <Log src={cloudelogo} />
          Continue with Github
        </Botton>
        {errorMessage && <MessageWrapper>{errorMessage}</MessageWrapper>}
      </div>
    );
  }
}

export default GithubButton;
