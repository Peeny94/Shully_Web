import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, limit, onSnapshot, orderBy } from "firebase/firestore";



// Monolog db를 가져오는 작업,랜더링 기능만 담을 것-> 수정 생성은 컴포넌트!
export default function MonologList() {

  useEffect(() => {

  });

}
