import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
//children은 component 내부의 모든 것을 의미. 해당 라우터로 감싸주면 하기의 if문이 작용된다. : login 페이지로 이동.
export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;  
}) {
    const user = auth.currentUser
    if(user===null){
        return <Navigate to="/login"/>;
    }
    //';' 선언을 잊으면 error 뜸. 주의%
    return children;
}