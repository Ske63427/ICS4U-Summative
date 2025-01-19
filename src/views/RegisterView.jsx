import GuestHeader from '../components/GuestHeader.jsx';
import Footer from '../components/Footer.jsx';
import TwoBySixGenreTable from '../components/TwoBySixGenreTable.jsx';
import {useState} from "react";

function RegisterView() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    function register(e){
        e.preventDefault();
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
                                    <form className="text-center" method="post" onSubmit={(e) => register(e)}>
                                        <div style={{margin: "0px 0px 16px"}}>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder={"First Name"}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                value={firstName}
                                            />
                                        </div>
                                        <div style={{margin: "0px 0px 16px"}}>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder={"Last Name"}
                                                onChange={(e) => setLastName(e.target.value)}
                                                value={lastName}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                onChange={(e) => setLastName(e.target.value)}
                                                value={email}
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
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input className="form-control" type="password" name="password" placeholder="Re-Enter Password"/>
                                        </div>
                                        <div className="mb-3">
                                            <button className="btn btn-primary d-block w-100" type="submit">Login</button>
                                        </div>
                                        <p className="text-muted">Forgot your password?</p>
                                        <p className="text-muted">No Account?</p>
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