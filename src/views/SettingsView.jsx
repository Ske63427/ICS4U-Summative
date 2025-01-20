import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TwoBySixGenreTable from "../components/TwoBySixGenreTable.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context";
import {getAuth, signOut} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from "../firebase";
import { get } from 'immutable';
import { use } from 'react';

function SettingsView() {
    const [chosenGenres, setChosenGenres] = useState([]);
    const navigate = useNavigate();
    const { user, setUser, setSelected } = useStoreContext();

    function logout() {
        setUser(null);
        setSelected([]); // Clear the selected genres in the context state
        setChosenGenres([]); // Clear the local state
        localStorage.removeItem('genrePreference');
        signOut(auth);
        navigate("/");
    }

    const handleGenreSelection = (selectedGenres) => {
        setChosenGenres(selectedGenres);
        // console.log("Selected genres:", selectedGenres);
    };

    useEffect(() => {
        async function fetchPreferredGenres() {
            if (user) {
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setChosenGenres(userData.genreList || []);
                    setSelected(userData.genreList || []); // Initialize context state
                }
            }
        }
        fetchPreferredGenres();
    }, [user, setSelected]);

    console.log(user)

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row" style={{margin: "0px 0px 16px"}}>
                            <div className="col">
                                <p style={{fontSize: "16px"}}>{user.email}</p>
                            </div>
                        </div>
                        <div className="row" style={{margin: "0px 0px 16px"}}>
                            <div className="col">
                                <input type="text" style={{padding: "6px 12px", borderRadius: "5px"}} placeholder={"First Name"}/>
                            </div>
                        </div>
                        <div className="row" style={{margin: "0px 0px 16px"}}>
                            <div className="col">
                                <input type="text" style={{padding: "6px 12px", borderRadius: "5px"}} placeholder={"Last Name"}/>
                            </div>
                        </div>
                        <div className="row" style={{margin: "0px 0px 16px"}}>
                            <div className="col">
                                <input type="password" style={{padding: "6px 12px", borderRadius: "5px"}} placeholder={"Password"}/>
                            </div>
                        </div>
                        <div className="row" style={{margin: "0px 0px 16px"}}>
                            <div className="col">
                                <input className="btn btn-primary" type="submit"/><br/><br/>
                                <button className="btn btn-primary" onClick={() => logout()}>Log Out</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6" style={{marginTop: "20px"}}>
                        <div className="table-responsive" style={{width: "500px", marginLeft: "0px", marginTop: "0px"}}>
                            <TwoBySixGenreTable selectedGenres={handleGenreSelection}/>
                        </div>
                    </div>
                </div>
            </div>
            {/*<Footer/>*/}
        </div>

    )
}

export default SettingsView;