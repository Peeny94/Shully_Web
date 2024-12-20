import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate(); // 
    const logOut = () => {
        auth.signOut().then(() => {
            navigate("/login");
        }).catch((error) => {
            console.error("Logout failed:", error);
        });
    };
        
    return (
        <h1>
        <button onClick={logOut}>logout</button> 
        </h1>
    );
}