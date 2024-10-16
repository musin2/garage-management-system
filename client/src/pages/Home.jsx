import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
    return(
        <>
        <NavBar />
          <h1 className='text-center m-3'>Home</h1>
        <div className='container-lg p-2'>
          <div className='row justify-content-between'>
            <div className='col-3'>
          <h4>Our Services</h4>
          </div>
            <div className='col-3'>
          <Link to="/appointmentsForm"><button className='btn bg-info m-2'>Book an Appointment</button></Link>
            </div>
          </div>
          <table className='table '>
            <thead>
              <tr>
              <th>Service</th>
              <th>Description</th>
              <th>Price</th>
              </tr>
              </thead>
              <tbody>
              {/* {fill from SERVICE table} */}
              </tbody>
          </table>
        </div>
        </>
    )
}

export default Home;