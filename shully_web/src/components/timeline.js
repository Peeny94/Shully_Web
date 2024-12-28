import { useEffect, useState } from "react";
import { db } from "../firebase";
import PropTypes from "prop-types"; // postForm 의 부모요소를 가져오는 자식이기 때문에 사용가능함.
import React from "react";
import Shully from "./shully";// 자식요소를 import 렌더링 시켜줘야 자식요소에서 Timline 컴포넌트 사용 가능.
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Wrapper } from "./auth-Components";
//.tsx 구조에선 typescript 를 써서 하기 코드만으로 타입 검증이 된다고 한다. 난 그냥. js도 잘 못하는데, ts를 쓰기보단 자바에 집중하는 게 좋다. 하기에 props. 으로 해서 프로퍼티 자식요소를 검증하는 방식을 쓴다.
// export interface IShully {
//     photo: String;
//     shully: String;
//     userid: String;
//     username: String;
//     createdAt: Number;
// }

export default function Timeline() {
    //  const [tweets, setTweet] = useState<ITweet[]>([]); <- 기존 코드.
    const [shullys, setShully] = useState([]); // 해당 부분에서 타입 정의를 하지 않기로 해..
// 파일 배열을 정리함. json 구조화.
    const fetchShullys = async() => {
        const shullysQuery = query(
            collection(db, "shullys"),
            orderBy("createdAt","desc")
        );
    //여기에 if문으로 타입 검증 코드 넣어주기. 일단 자자!!!!!!!!!!!!!!!!!!!
        const snapshot = await getDocs(shullysQuery);
        // map은 배열을 가져오지만, flatMap은 각 요소를 값으로 가져옴.
        const shullys = snapshot.docs.flatMap((doc)=> {
            const data = doc.data();
            console.log(data);
//const { tweet, createdAt, userId, username, photo } = doc.data();
// 가져오는 데이터 값에 대한 유효성 검사를 진행 후 값을 배열에 담아 json 형태로 렌더링.
            const typeShullyOk = ["shully", "userid", "username", "createdAt", "photo"];
            const oKShullys = typeShullyOk.reduce((okValue, key) => {
                if (key in data && data[key] !== undefined) {
                    okValue[key] = data[key];
                }
                return okValue;
              }, {});
// 필수 필드 확인- props 검증은 아래에서 해줌. 한 번 더 해줌.코드 중복상황임.
            const requiredFields = ["shully", "userid", "username", "createdAt"];
            const hasAllRequiredFields = requiredFields.every((field) => field in oKShullys);

            if (!hasAllRequiredFields) {
                console.warn("Incomplete data:", oKShullys);
                return []; // 데이터 무효, flatMap에서 제외
            }            
            return{
                id: doc.id,
                ...oKShullys,//oKShullys 객체의 모든 키-값 쌍을 새 객체에 병합, 스프레드 연산자'...' 라고 함.
            }
                });
        setShully(shullys);
    };
    useEffect(()=> {
        fetchShullys();
    },[]);
// 타입 검증은 코드 안정성 및 에러 확인에 중요.-> 가져온 데이터를 render 하는 과정에서 검증을 시도하는 중복 지점 발생중.그러나 일단은 냅두자. 동기화 방식의 검증도 중요한듯.
Timeline.propTypes = {
    shullys: PropTypes.arrayOf(
// 배열의 구조를 잡아준다. 안정성 확보에 좋다.
    PropTypes.shape({
//  id 는 상위 폴더의 넘버링을 말함.
        id: PropTypes.string.isRequired,
        photo: PropTypes.string,
        shully: PropTypes.string.isRequired,
        userid: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
    })
 ),
};        
    return (
    <Wrapper>
        {/* Shully에 특정 컴포넌트를 전달. */}
        {shullys.map((shully) => (
      <Shully key={shully.id} {...shully} />
    ))}
        {/* {JSON.stringify(shullys)} */}
    </Wrapper>
    );
}
 
