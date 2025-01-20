import { Link } from "react-router-dom";

function Header() {
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
                            <Link to={`/cart`} className="nav-link" href="#">Cart</Link>
                        </li>
                    </ul>
                    <div className="d-md-none my-2">
                        <button className="btn btn-light me-2" type="button">Button</button>
                        <button className="btn btn-primary" type="button">Button</button>
                    </div>
                </div>
                <div className="d-none d-md-block">
                    <Link to={`/settings`} className="btn btn-primary" role="button">Account</Link>
                </div>
            </div>
        </nav>
    )
}

export default Header;