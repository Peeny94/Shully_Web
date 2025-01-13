import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, limit, onSnapshot, orderBy } from "firebase/firestore";
import { 
  AttachFileInput, ModifyFileButton, ShullyWrapper, 
  ShullyColumn, ShullyPayload, ShullyUsername, EditTextArea,
  Photo, PhotoBack, DeleteButton, ButtonContainer ,ModifyButton
} from "../components/auth-Components";

// 스타일 정의
const MonologWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`;


// MonologPage 컴포넌트 수정, 삭제, 타임라인 디자인 정의
export default function MonologPage({username, photos, monolog, userid, id,createdAt}) {
  const user = auth.currentUser;
  const [monologs, setMonologs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      console.error("User is not authenticated.");
      return;
    }

    // 🔥 실시간 데이터 구독 및 해제
    const fetchMonologs = () => {
      try {
        const monologQuery = query(
          collection(db, "monologs"),
          where("userid", "==", user.uid),
          // orderBy("createdAt", "desc"),
          limit(25)
        );

        // ✅ 실시간 데이터 구독
        const unsubscribe = onSnapshot(monologQuery, (snapshot) => {
          const fetchedMonologs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMonologs(fetchedMonologs);
          setLoading(false);
        });

        // ✅ 컴포넌트 언마운트 시 구독 해제
        return unsubscribe;

      } catch (error) {
        console.error("Error fetching monologs:", error);
      }
    };

    const unsubscribe = fetchMonologs();

    // ✅ 컴포넌트 언마운트 시 구독 해제
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };

  }, [user]);

  return (
    <ShullyWrapper>

        <ButtonContainer>
            {user?.uid === userid && (
                <>
                    {isEditing ? (
                        <>
                            <ModifyButton>
                            {isUploading ? "Uploading..." : "Save"}
                            </ModifyButton>
                            <ModifyFileButton >
                                {file ? "Photo added ✅" : "Add Photo"}
                            </ModifyFileButton>  
                            <AttachFileInput
                                style={{ display: "none" }}
                            />
                        </>
                    ) : (
                        <ModifyButton onClick={() => setIsEditing(true)}>Edit</ModifyButton>
                    )}
                    <DeleteButton>Delete</DeleteButton>
                </>
            )}
        </ButtonContainer>
    </ShullyWrapper>
);
}
