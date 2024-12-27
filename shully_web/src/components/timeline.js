import { useEffect, useState } from "react";
import { db } from "../firebase";
import PropTypes from "prop-types";
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
    const fetchShullys = async() => {
        const shullysQuery = query(
            collection(db, "shullys"),
            orderBy("createdAt","desc")
        );
        const snapshot = await getDocs(shullysQuery);
        snapshot.docs.forEach(doc=> console.log(doc.data()));
    };
    useEffect(()=> {
        fetchShullys();
    },[]);
// 타입 검증은 코드 안정성 및 에러 확인에 중요.
    Timeline.propTypes = {
        shullys: PropTypes.arrayOf(
            // 배열의 구조를 잡아준다. 안정성 확보에 좋다.
          PropTypes.shape({
            photo: PropTypes.string,
            shully: PropTypes.string.isRequired,
            userid: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            createdAt: PropTypes.number.isRequired,
          })
        ),
      };

    return <Wrapper>
        {JSON.stringify(shullys)}
    </Wrapper>;
}

