import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Header() {
    const { user, setUser, setSelected } = useStoreContext();
    const firestore = getFirestore();
    const [signInMethod, setSignInMethod] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSignInMethod = async () => {
            if (user) {
                const userDoc = await getDoc(doc(firestore, "users", user.uid));
                if (userDoc.exists()) {
                    setSignInMethod(userDoc.data().signInMethod);
                }
            }
        };

        fetchSignInMethod();
    }, [user, firestore]);

    const handleSettingsClick = (e) => {
        if (signInMethod === "google") {
            e.preventDefault();
            alert("Only users who sign in with email can change settings.");
        } else {
            navigate('/settings');
        }
    };

    function logout() {
        setUser(null);
        setSelected([]);
        localStorage.removeItem('genrePreference');
        signOut(auth);
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-md bg-dark py-3" data-bs-theme="dark">
            <div className="container">
                <Link to={`/home`} className="navbar-brand d-flex align-items-center">
                    <span>321 Movies</span>
                </Link>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-6">
                    <span className="visually-hidden">Toggle navigation</span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-grow-0 order-md-first" id="navcol-6">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to={`/movies/all`} className="nav-link active">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/cart`} className="nav-link">Cart</Link>
                        </li>
                    </ul>
                    <div className="d-md-none my-2">
                        <button className="btn btn-light me-2" type="button">Button</button>
                        <button className="btn btn-primary" type="button">Button</button>
                    </div>
                </div>
                <div className="d-none d-md-block">
                    <button className="btn btn-primary" type="button" onClick={logout} >Log Out</button>
                    <button className="btn btn-primary" type="button" onClick={handleSettingsClick} style={{marginLeft: "5px"}}>Account</button>
                </div>
            </div>
        </nav>
    );
}

export default Header;