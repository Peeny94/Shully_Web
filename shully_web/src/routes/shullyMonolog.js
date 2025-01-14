import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { HomeWrapper, GlobalStyles } from "../components/auth-Components";
import Monolog from "../components/monolog";
import MonologPostForm from "../components/monologForm";

// 스타일 컴포넌트
const Wrapper = styled.div`
    height: 90%;
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 50px 50px;
`;

// ✅ Monolog Timeline 컴포넌트
export default function MonologTimeline() {
    const [monologs, setMonologs] = useState([]);

    useEffect(() => {
        // 🔥 Firestore에서 monologs 데이터 실시간 구독
        const monologsQuery = query(
            collection(db, "monologs"),
            orderBy("createdAt", "desc"),
            limit(25)
        );

        const unsubscribe = onSnapshot(monologsQuery, (snapshot) => {
            const monologData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMonologs(monologData);

            // ✅ 콘솔에 데이터 출력
            console.log("👀 Monolog 데이터:", monologData);
        });

        return () => unsubscribe(); // 🔄 구독 해제
    }, []);

    return (
        <Wrapper>
            <GlobalStyles />
            {/* ✅ 작성 폼 */}
            <MonologPostForm />

            {/* ✅ Monolog 목록 출력 */}
            {monologs.map((monolog) => (
                <Monolog
                    key={monolog.id}
                    username={monolog.username}
                    monolog={monolog.monolog}
                    photo={monolog.photo}
                    video={monolog.video}
                    createdAt={monolog.createdAt}
                    updatedAt={monolog.updatedAt}
                    userid={monolog.userid}
                    id={monolog.id}
                />
            ))}
        </Wrapper>
    );
}
