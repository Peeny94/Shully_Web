import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Shully from "../components/shully";
import {
    ProfileWrapper,
    UserProfileImage,
    UserImageUpload,
    UserProfileImageWrapper,
    UserProfileName
} from "../components/auth-Components";
import cloudeImage from "../imgs/cloude.jpg";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage  } from "../firebase";
import { collection, limit, orderBy, query, where, onSnapshot, getDocs } from "firebase/firestore";

const ShullyList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default function Profile() {
    const user = auth.currentUser;
    const [shullyForUsers, setShullyForUsers] = useState([]); // 사용자 글 상태
    const [userProfile, setUserProfile] = useState(user?.photoURL || cloudeImage); // 프로필 이미지 상태

    const onUserProfileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !user) return;

        try {
            const locationRef = ref(storage, `UserProfiles/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const UserProfileUrl = await getDownloadURL(result.ref);

            // Firebase Auth 사용자 프로필 업데이트
            await updateProfile(user, { photoURL: UserProfileUrl });

            // 로컬 상태 업데이트
            setUserProfile(UserProfileUrl);
            alert("Profile updated successfully.");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    const fetchShullys = async() => {
        if (!user?.uid) {
            console.error("User is not authenticated.");
            return;
        }

        const shullyQuery = query(
            collection(db, "shullys"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc"),
            limit(25)
        );

        const snapshot = await getDocs(shullyQuery);
        const shullys = snapshot.docs.map((doc)=>{
            const {shully, createdAt, userId, username, photo} = doc.data();
            return {
                shully,
                createdAt,
                userId,
                username,
                photo,
                id: doc.id,
            };
        });
        setShullyForUsers(shullys);
    };
        useEffect(() => {
            fetchShullys();
        }, []);

    return (
        <ProfileWrapper>
            <UserProfileImageWrapper htmlFor="userProfile">
                <UserProfileImage
                    src={userProfile}
                    alt="Profile"
                />
                <UserImageUpload
                    onChange={onUserProfileChange}
                    id="userProfile"
                    type="file"
                    accept="image/*"
                />
            </UserProfileImageWrapper>
            <UserProfileName>{user?.displayName || "Anonymous"}</UserProfileName>
            <ShullyList>
                {shullyForUsers.map((shully)=>(
                    <Shully key ={shully.id} {...shully}/>
                ))}
            </ShullyList>
        </ProfileWrapper>
    );
}
