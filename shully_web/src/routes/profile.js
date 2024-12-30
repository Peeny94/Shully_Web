import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Wrapper } from "../components/auth-Components";
import { auth } from "../firebase";
import cloudeImage from "../imgs/cloude.jpg";

const UserProfileImageUp = styled.label`
    cursor: pointer;
`;

const UserProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: fit;
    border: 2px solid #ccc;
`;

const UserImageUpload = styled.input`
    display: none;
`;

const Name = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

export default function Profile() {
    const user = auth.currentUser;
    const [userProfile, setUserProfile] = useState(cloudeImage);


    return (
        <Wrapper>
            <UserProfileImageUp alt="profile">
            <UserProfileImage
                    src={userProfile}
                    alt="Profile"
                />
                <UserImageUpload
                    type="file"
                    accept="image/*"
                />
            </UserProfileImageUp>
            <Name>{user?.displayName || "Anonymous"}</Name>
        </Wrapper>
    );
}
