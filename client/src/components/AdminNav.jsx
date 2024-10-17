import { Link } from "react-router-dom";

function AdminNav() {
    return(
        <>
          <li className="nav-item">
                <Link to={"/appointments"} className="nav-link active">
                  Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/services"} className="nav-link active">
                  Services
                </Link>
              </li>
            </>
    )
}
export default AdminNav;