import GuestHeader from '../components/GuestHeader.jsx';
import Footer from '../components/Footer.jsx';
import TwoBySixGenreTable from '../components/TwoBySixGenreTable.jsx';
import {useState} from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useStoreContext } from "../context";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

function RegisterView() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [chosenGenreList, setChosenGenreList] = useState([]);
    const { setUser } = useStoreContext();
    const navigate = useNavigate();

    async function registerByEmail() {

        if (password != confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (chosenGenreList.length < 10) {
            alert('Please choose at least ten genre');
            return;
        }

        try {
            const user = (await createUserWithEmailAndPassword(auth, email, password)).user
            await updateProfile(user, { displayName: `${firstName} ${lastName}` })
            setCurrentUser(auth.currentUser);

            await setDoc(doc(firestore, 'users', user.uid), {
                email: email,
                firstName: firstName,
                lastName: lastName,
                genreList: chosenGenreList,
                signInMethod: 'email',
                previousPerchaseHistory: []
            })

            localStorage.setItem('genrePreference', JSON.stringify(chosenGenreList));
            setUserGenreList(chosenGenreList);
            navigate('/movies');
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('Email already in use');
                    break;
                case 'auth/invalid-email':
                    alert('Invalid email');
                    break;
                case 'auth/weak-password':
                    alert('Password is too weak, 6+ characters required');
                    break;
                case "auth/too-many-requests":
                    alert('Too many attempts. Please try again later.');
                    break;
                case "auth/network-request-failed":
                    alert('Network error. Please check your connection.');
                    break;
                default:
                    alert('An error occurred');
                    console.error(error.code);
                    console.error(error.message);
                    break;
            }
        }
    }

    const registerByGoogle = async () => {
        try {
            const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
            setUser(user);
            navigate('/movies/all');
        } catch {
            alert("Error creating user with email and password!");
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
                                    <form className="text-center" method="post" onSubmit={(e) => registerByEmail(e)}>
                                        <div style={{margin: "0px 0px 16px"}}>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name={"first-name"}
                                                placeholder={"First Name"}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                value={firstName}
                                                required
                                            />
                                        </div>
                                        <div style={{margin: "0px 0px 16px"}}>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name={"last-name"}
                                                placeholder={"Last Name"}
                                                onChange={(e) => setLastName(e.target.value)}
                                                value={lastName}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
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
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="confrim-password"
                                                placeholder="Re-Enter Password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                value={confirmPassword}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <button className="btn btn-primary d-block w-100" type="submit">Register</button>
                                        </div>
                                        <button
                                            className="btn btn-primary d-block w-100"
                                            onClick={() => registerByGoogle()}
                                            style={{marginBottom: "10px"}}
                                        ><img
                                            src={"https://pluspng.com/img-png/google-logo-png-open-2000.png"}
                                            width={"25px"}
                                            style={{marginRight: "5px", marginLeft: "-5px", marginTop: "-2px"}}
                                        />Register with Google</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col" style={{display: "flex", justifyContent: "center"}}>
                            <div className="table-responsive" style={{marginTop: "70px", width: "500px", marginLeft: "0px"}}>
                                <TwoBySixGenreTable/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default RegisterView