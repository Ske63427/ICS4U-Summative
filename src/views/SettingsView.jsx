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
    const navigate = useNavigate();
    const { user, setUser } = useStoreContext();

    function logout() {
        setUser(null);
        signOut(auth);
        navigate("/");
    }

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
                            <TwoBySixGenreTable/>
                        </div>
                    </div>
                </div>
            </div>
            {/*<Footer/>*/}
        </div>

    )
}

export default SettingsView;