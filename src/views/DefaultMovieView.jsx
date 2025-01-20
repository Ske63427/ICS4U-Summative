import { Outlet, useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/index.jsx";
import Header from "../components/Header.jsx";

function DefaultMovieView() {
    const navigate = useNavigate();
    const { user, setUser } = useStoreContext();

    return(
        <div>
            <Header/>
            <h1 style={{textAlign: "center"}}>Welcome, {user.email}</h1>
            <Outlet/>
        </div>
    )
}

export default DefaultMovieView;