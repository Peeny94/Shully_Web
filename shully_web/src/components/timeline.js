import { useEffect, useState } from "react";
import { db } from "../firebase";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Wrapper } from "./auth-Components";

export interface IShully {
    photo: String;
    shully: String;
    userid: String;
    username: String;
    createdAt: Number;
}

export default function Timeline() {
    const [shullys, setShully] = useState<IShully>([]); 
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
    return <Wrapper>
        {JSON.stringify(shullys)}
    </Wrapper>;
}