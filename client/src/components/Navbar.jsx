import { Link } from "react-router-dom";

function NavBar() {
    return(
        <>
        <Link to={"/"}>Home</Link>
        <Link to={"/appointments"}>Appointments</Link>
        </>
    )
}

export default NavBar;