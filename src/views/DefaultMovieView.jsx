import { Outlet, useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/index.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Header from "../components/Header.jsx";

function DefaultMovieView() {
    const navigate = useNavigate();
    const { email } = useStoreContext();
    const { user, setUser } = useStoreContext();

    function logout() {
        setUser(null);
        signOut(auth);
        navigate("/");
    }

    function cart() {
        navigate("/cart")
    }

    return(
        <div>
            <Header/>
            <h1 style={{textAlign: "center"}}>Welcome, {user.email}</h1>
            <Outlet/>
        </div>
    )
}

export default DefaultMovieView;