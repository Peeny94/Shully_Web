import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Shully from "../components/shully";
import {
    ProfileWrapper,
    UserProfileImage,
    UserImageUpload,
    UserProfileImageWrapper,ButtonContainer,ModifyNameBtn,
    UserProfileName,GlobalStyles,ModifyInput
} from "../components/auth-Components";
import cloudeImage from "../styled/imgs/cloude.jpg";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage  } from "../firebase";
import { collection, limit, orderBy, query, where, onSnapshot, setDoc,getDocs,doc} from "firebase/firestore";

const ShullyList = styled.div`
    display: flex;
    flex-direction: column;
    align-arrs: stretch; /* 자식 요소가 부모의 너비/높이에 맞춤 */
    justify-content: flex-start; /* 내용이 위쪽에 정렬 */
    gap: 20px;
    padding: 10px; /* 내부 여백 추가 */
    box-sizing: border-box; /* 패딩 포함 크기 계산 */
    // margin: 20px 0; Wrapper 요소 사이의 외부 여백
`;

export default function Profile() {
    const user = auth.currentUser;
    const [shullyProfileUsers, setShullyProfileUsers] = useState([]); // 사용자 글 상태
    const [userProfile, setUserProfile] = useState(user?.photoURL || cloudeImage); // 프로필 이미지 상태
    const [name, setName] = useState(user?.displayName ||user.email.split('@')[0]);
    const [isEditingName, setIsEditingName] = useState(false); 
    const [isUpdated, setIsUpdated] = useState(false); // 업데이트 알림 상태
    const [alertMessage, setAlertMessage] = useState("");


    const triggerAlert = (message) => {
        setAlertMessage(message);
        setIsUpdated(true);
        setTimeout(() => {
          setIsUpdated(false);
        }, 2000); // 3초 후 알림 숨기기
      };
    
    const onUserProfileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !user) return;
        try {
            const locationRef = ref(storage, `UserProfiles/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const UserProfileUrl = await getDownloadURL(result.ref);
            setUserProfile(UserProfileUrl);
            await updateProfile(user, { photoURL: UserProfileUrl });
            window.confirm("Are you sure changed your profile?");
            triggerAlert("updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
    const onUserNameChange = async () => {
        const nameRegex = /^[a-zA-Z0-9\uAC00-\uD7A3]{1,20}$/; // 영문자와 숫자만 허용, 최대 20글자
        if (!user) {
            alert("User not authenticated.");
            return;
        }
        if (!name.trim() || !nameRegex.test(name)) {
            alert("Name must be alphanumeric and between 1 to 20 characters without spaces or special characters.");
            return;
        }
        try {
            await updateProfile(user, { displayName: name });
            alert("Name updated successfully!");
            setIsEditingName(false); // 편집 모드 종료
        } catch (error) {
            console.error("Error updating name:", error);
            alert("Failed to update name.");
        }
    };
    useEffect(() => {        
        const fetchShullys = async() => {
            if (!user?.uid) {
                console.error("User is not authenticated.");
                return;
            } 
             const shullyQuery = query(
                collection(db, "shullys"),
                where("userid", "==", user.uid),
                // orderBy("createdAt", "desc"),
                limit(25)
            );
            const monologQuery = query(
                collection(db, "monologs"),
                where("userid", "==", user.uid),
                limit(25)
                );
    // 두 쿼리를 병렬로 실행
            const [shullySnapshot, monologSnapshot] = await Promise.all([
                getDocs(shullyQuery),
                getDocs(monologQuery)
            ]);
            try {
    // flatmap 방식으로 배열 정리를 해야 가져온다. css 호환 문제는 아닌듯, 쿼리 id 소문자 오타 수정. 난 userid! not userId@@@
            const shullys = shullySnapshot.docs.flatMap((doc) => {
                const data = doc.data();
                const { shully, createdAt, userid, username, photo } = data;
            
                // 필수 필드가 모두 있는지 확인
                const requiredFields = [shully, createdAt, userid, username];
                const hasAllRequiredFields = requiredFields.every((field) => field !== undefined);
            
                if (!hasAllRequiredFields) {
                    console.warn("Incomplete data:", data);
                    return []; // 데이터가 누락된 경우 빈 배열 반환
                }
                return {
                    id: doc.id,
                    content: shully,
                    createdAt,
                    userid,
                    username,
                    photo,
                    source: "shully",
                   };
               });
               const monologs = monologSnapshot.docs.flatMap((doc) => {
                   const data = doc.data();
                   const { monolog, createdAt, userid, username, photo,video} = data;
           
                   // 필수 필드가 모두 있는지 확인
                   const requiredFields = [monolog, createdAt, userid, username];
                   const hasAllRequiredFields = requiredFields.every((field) => field !== undefined);
           
                   if (!hasAllRequiredFields) {
                       console.warn("Incomplete data:", data);
                       return []; // 데이터가 누락된 경우 빈 배열 반환
                   }
                   return {
                       id: doc.id,
                       content: monolog,
                       createdAt,
                       userid,
                       username,
                       photo,video,
                       source:"monolog"
                   };
               });
               //오름차순은 오래된 게 처음. 내림차순은 앞에 a,b 순서 바꿔주면 됨.
               const profileTimeline = [...shullys, ...monologs].sort(
                   (a, b) => b.createdAt - a.createdAt
               );
               console.log("Filtered Shullys:", profileTimeline );
               setShullyProfileUsers(profileTimeline);
           } catch (error) {
               console.error("Error fetching shullys:", error);
           }
        };
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
                   id="userProfileImage"
                   type="file"
                   accept="image/*"
               />
           </UserProfileImageWrapper>
           {/* 이름 업데이트시 변경해줘야함. */}
           <UserProfileName>
           {isEditingName ? (
                   <>
                       <ModifyInput
                           type="text"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                       />
                       <ButtonContainer>
                           <ModifyNameBtn onClick={onUserNameChange}>
                               Update
                           </ModifyNameBtn>
                           <ModifyNameBtn onClick={() => setIsEditingName(false)}>
                               Cancel
                           </ModifyNameBtn>
                       </ButtonContainer>
                   </>
               ) : (
                   <>
                       {name}
                       <ButtonContainer>
                           <ModifyNameBtn onClick={() => setIsEditingName(true)}>
                               Edit
                           </ModifyNameBtn>
                       </ButtonContainer>
                   </>
               )}
           </UserProfileName>
               
           <GlobalStyles/>
           <ShullyList>
               {shullyProfileUsers.map((arr)=>(
                <div key={arr.id} >
                    <h4>{arr.username} - {arr.source === "shully" ? "Shully Post" : "Monolog Post"}</h4>
                    <p>{arr.content}</p>
                    {arr.photo && <img src={arr.photo} alt="Uploaded" />}
                    {arr.video && (
                        <video controls style={{ width: "100%" }}>
                            <source src={arr.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    <small>{new Date(arr.createdAt).toLocaleString()}</small>
                </div>
            ))}
           </ShullyList>
       </ProfileWrapper>
   );
}
