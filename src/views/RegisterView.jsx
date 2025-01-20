import GuestHeader from '../components/GuestHeader.jsx';
import Footer from '../components/Footer.jsx';
import TwoBySixGenreTable from '../components/TwoBySixGenreTable.jsx';
import {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; //, signInWithPopup, GoogleAuthProvider
import { auth } from "../firebase";
import { useStoreContext } from "../context";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getFirestore } from 'firebase/firestore';

function RegisterView() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [chosenGenres, setChosenGenres] = useState([]);

    const { setSelected, setCurrentUser } = useStoreContext(); //setUser,
    const navigate = useNavigate();
    const firestore = getFirestore();

    const handleGenreSelection = (selectedGenres) => {
        setChosenGenres(selectedGenres);
        // console.log("Selected genres:", selectedGenres);
    };

    useEffect(() => {
        // console.log("Updated chosenGenres:", chosenGenres);
    }, [chosenGenres]);

    async function registerByEmail() {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (chosenGenres.length < 10) {
            alert('Please choose at least ten genres');
            return;
        }

        try {
            const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
            await updateProfile(user, { displayName: `${firstName} ${lastName}` });
            setCurrentUser(auth.currentUser);

            await setDoc(doc(firestore, 'users', user.uid), {
                email: email,
                firstName: firstName,
                lastName: lastName,
                genreList: chosenGenres,
                signInMethod: 'email',
                previousPurchaseHistory: []
            });

            // console.log(chosenGenres)

            localStorage.setItem('genrePreference', JSON.stringify(chosenGenres));
            setSelected(chosenGenres);
            navigate('/movies/all');
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
                    console.error(`Network error occurred. Retrying... (${retryCount} retries left)`);
                    setTimeout(() => registerByEmail(retryCount - 1), 3000);
                    break;
                default:
                    alert('An error occurred');
                    console.error(error.code);
                    console.error(error.message);
                    break;
            }
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
                                    <form className="text-center" onSubmit={(e) => {
                                        e.preventDefault();
                                        registerByEmail();
                                    }}>
                                        <input className="form-control mb-3" type="text" placeholder="First Name"
                                               onChange={(e) => setFirstName(e.target.value)} value={firstName}
                                               required/>
                                        <input className="form-control mb-3" type="text" placeholder="Last Name"
                                               onChange={(e) => setLastName(e.target.value)} value={lastName} required/>
                                        <input className="form-control mb-3" type="email" placeholder="Email"
                                               onChange={(e) => setEmail(e.target.value)} value={email} required/>
                                        <input className="form-control mb-3" type="password" placeholder="Password"
                                               onChange={(e) => setPassword(e.target.value)} value={password} required/>
                                        <input className="form-control mb-3" type="password"
                                               placeholder="Re-Enter Password"
                                               onChange={(e) => setConfirmPassword(e.target.value)}
                                               value={confirmPassword} required/>
                                        <button className="btn btn-primary d-block w-100" type="submit">Register
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col" style={{display: "flex", justifyContent: "center"}}>
                            <div className="table-responsive" style={{marginTop: "70px", width: "500px"}}>
                                <TwoBySixGenreTable selectedGenres={handleGenreSelection}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default RegisterView;
