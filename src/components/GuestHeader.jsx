import { Link } from "react-router-dom";

function GuestHeader() {
    return (
        <nav className="navbar navbar-expand-md bg-dark py-3" data-bs-theme="dark">
            <div className="container">
                    <Link to={'/'} className="navbar-brand d-flex align-items-center">
                        <span style={{textAlign: "center", marginLeft: "102px"}}>321 Movies</span>
                    </Link>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-6">
                    <span className="visually-hidden">Toggle navigation</span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-grow-0 order-md-first" id="navcol-6">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"></li>
                        <li className="nav-item"></li>
                    </ul>
                    <div className="d-md-none my-2">
                        <button className="btn btn-light me-2" type="button">Button</button>
                        <button className="btn btn-primary" type="button">Button</button>
                    </div>
                </div>
                <div className="d-none d-md-block">
                    <Link to={'/login'} className="btn btn-primary" role="button" href="#">Login</Link>
                </div>
            </div>
        </nav>
    )
}

export default GuestHeader;