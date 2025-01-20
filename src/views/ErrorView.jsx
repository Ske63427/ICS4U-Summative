import { Link } from "react-router-dom";

function ErrorView() {
    return(
        <div>
            <h1>ERROR, PAGE DOES NOT EXIST</h1>
            <Link to={'/'}>Return to Home</Link>
        </div>
    )
}

export default ErrorView;
