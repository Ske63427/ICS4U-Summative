import { Outlet } from "react-router-dom";
import { useStoreContext } from "../context/index.jsx";
import Header from "../components/Header.jsx";

function DefaultMovieView() {
    const { user } = useStoreContext();

    return(
        <div>
            <Header/>
            <h1 style={{textAlign: "center"}}>Welcome, {user.displayName}</h1>
            <Outlet/>
        </div>
    )
}

export default DefaultMovieView;