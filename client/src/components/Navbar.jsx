import { Link } from "react-router-dom";

function NavBar() {
    return(
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">Garage 66</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavBar" aria-controls="mainNavBar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse offset-3" id="mainNavBar">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item ">
                    <Link to={"/"} className="nav-link active" aria-current="page" >Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={"/appointments"} className="nav-link active" >Appointments</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={"/profile"} className="nav-link active" >Profile</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={"/about"} className="nav-link active" >About</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={"/services"} className="nav-link active" >Services</Link>
                    </li>
                    {/* <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                    </li> */}
                </ul>
                <form className="d-flex">
                    <button className="btn btn-outline-info" type="submit">Logout</button>
                </form>
                </div>
            </div>
        </nav>
        </>
    )
}

export default NavBar;