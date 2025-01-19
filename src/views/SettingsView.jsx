import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TwoBySixGenreTable from "../components/TwoBySixGenreTable.jsx";

function SettingsView() {
    return (
        <div>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row" style={{margin: "0px 0px 16px"}}>
                            <div className="col">
                                <p style={{fontSize: "16px"}}>Email(Immutable)</p>
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
                                <input className="btn btn-primary" type="submit"/>
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