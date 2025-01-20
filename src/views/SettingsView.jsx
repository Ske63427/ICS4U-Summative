import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import TwoBySixGenreTable from "../components/TwoBySixGenreTable.jsx"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useStoreContext } from "../Context"
import { getAuth, signOut, updatePassword } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, firestore } from "../firebase"

function SettingsView() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [chosenGenres, setChosenGenres] = useState([])
    const navigate = useNavigate()
    const { user, setUser, setSelected } = useStoreContext()

    function logout() {
        setUser(null)
        setSelected([])
        setChosenGenres([])
        localStorage.removeItem('genrePreference')
        signOut(auth)
        navigate("/")
    }

    const handleGenreSelection = (selectedGenres) => {
        setChosenGenres(selectedGenres)
    };

    useEffect(() => {
        async function fetchPreferredGenres() {
            if (user) {
                const userDoc = await getDoc(doc(firestore, 'users', user.uid))
                if (userDoc.exists()) {
                    const userData = userDoc.data()
                    setFirstName(userData.firstName || '')
                    setLastName(userData.lastName || '')
                    setChosenGenres(userData.genreList || [])
                    setSelected(userData.genreList || [])
                }
            }
        }
        fetchPreferredGenres()
    }, [user, setSelected])

    const handleSave = async () => {
        if (user) {
            const userDocRef = doc(firestore, 'users', user.uid)
            const updatedData = {}
            if (firstName) updatedData.firstName = firstName
            if (lastName) updatedData.lastName = lastName
            if (chosenGenres.length > 0) updatedData.genreList = chosenGenres
            await updateDoc(userDocRef, updatedData)
            if (newPassword) {
                try {
                    await updatePassword(user, newPassword)
                } catch (error) {
                    alert("Error updating password: " + error.message)
                    return
                }
            }
            alert("Changes saved!");
        }
    };

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row" style={{ margin: "0px 0px 16px" }}>
                            <div className="col">
                                <p style={{ fontSize: "16px" }}>{user.email}</p>
                            </div>
                        </div>
                        <div className="row" style={{ margin: "0px 0px 16px" }}>
                            <div className="col">
                                <input
                                    type="text"
                                    style={{ padding: "6px 12px", borderRadius: "5px" }}
                                    name={"firstName"}
                                    placeholder={"First Name"}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row" style={{ margin: "0px 0px 16px" }}>
                            <div className="col">
                                <input
                                    type="text"
                                    style={{ padding: "6px 12px", borderRadius: "5px" }}
                                    name={"lastName"}
                                    placeholder={"Last Name"}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row" style={{ margin: "0px 0px 16px" }}>
                            <div className="col">
                                <input
                                    type="password"
                                    style={{ padding: "6px 12px", borderRadius: "5px" }}
                                    placeholder={"New Password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row" style={{ margin: "0px 0px 16px" }}>
                            <div className="col">
                                <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                                <br/><br/>
                                <button className="btn btn-primary" onClick={logout}>Log Out</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6" style={{ marginTop: "20px" }}>
                        <div className="table-responsive" style={{ width: "500px", marginLeft: "0px", marginTop: "0px" }}>
                            <TwoBySixGenreTable selectedGenres={handleGenreSelection} />
                        </div>
                    </div>
                </div>
            </div>
            {/*<Footer/>*/}
        </div>
    );
}

export default SettingsView;