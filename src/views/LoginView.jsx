import GuestHeader from '../components/GuestHeader.jsx';
import Footer from '../components/Footer.jsx';
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useStoreContext } from '../context/index.jsx';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

function LoginView() {
    const navigate = useNavigate()
    const email = useRef('')
    const { setUser } = useStoreContext()
    const [password, setPassword] = useState("")


    async function loginByEmail(e) {
        e.preventDefault();
        try {
            const user = (await signInWithEmailAndPassword(auth, email.current.value, password)).user;
            navigate('/movies/all');
            setUser(user);
        } catch (error) {
            console.log(error);
            alert("Error signing in!");
        }
    }

    async function loginByGoogle() {
        try {
            const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
            navigate('/movies/all');
            setUser(user);
        } catch (error) {
            alert("Error signing in!");
            console.log(error.message)
        }
    }

    return (
        <div>
            <GuestHeader/>
            <section className="position-relative py-4 py-xl-5">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 col-xl-4">
                            <div className="card mb-5">
                                <div className="card-body d-flex flex-column align-items-center">
                                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                                        </svg>
                                    </div>
                                    <form className="text-center" method="post" onSubmit={(e) => loginByEmail(e)}>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                ref={email}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                required/>
                                        </div>
                                        <div className="mb-3">
                                            <button className="btn btn-primary d-block w-100" type="submit">Login</button><br/>
                                            <button
                                                className="btn btn-primary d-block w-100"
                                                onClick={() => loginByGoogle()}
                                                style={{marginBottom: "10px"}}
                                            ><img
                                                src={"https://pluspng.com/img-png/google-logo-png-open-2000.png"}
                                                width={"25px"}
                                                style={{marginRight: "5px", marginLeft: "-5px", marginTop: "-2px"}}
                                            />Log in with Google
                                            </button>
                                        </div>
                                        <p className="text-muted">Forgot your password?</p>
                                        <Link to={`/register`}><p className="text-muted">No Account?</p></Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default LoginView;