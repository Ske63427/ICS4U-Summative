import { Outlet, useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/index.jsx";
import Header from "../components/Header.jsx";

function DefaultMovieView() {
    const navigate = useNavigate();
    const { email } = useStoreContext();

    function logout() {
        navigate("/");
    }

    function cart() {
        navigate("/cart")
    }
    return(
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}

export default DefaultMovieView;