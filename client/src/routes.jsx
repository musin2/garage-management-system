import App from "./App.jsx"
import Appointments from "./pages/Appointments.jsx"
import Services from "./pages/Services.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import CreateAppointment from "./pages/CreateAppointment.jsx";
import RegisterVehicle from "./pages/RegisterVehicle.jsx"
import Mechanics from "./pages/Mechanics.jsx";

const routes = [
    {path:"/", element: <App/>, errorElement: <ErrorPage/>},
    {path:"/appointments", element: <Appointments/>, errorElement: <ErrorPage/> },
    {path:"/profile", element: <Profile/>, errorElement: <ErrorPage/>},
    {path: "/services", element: <Services/>, errorElement: <ErrorPage/>},
    {path: "/home", element: <Home/>, errorElement: <ErrorPage/>},
    {path: "/about", element: <About/>, errorElement: <ErrorPage/>},
    {path:"/register", element:<Register/>, errorElement: <ErrorPage/> },
    {path:"/login" ,element:<Login/>, errorElement: <ErrorPage/>},
    {path: "/appointmentsForm", element: <CreateAppointment/>, errorElement: <ErrorPage/>},
    {path: "/register-vehicle", element: <RegisterVehicle/>, errorElement: <ErrorPage/>},
    {path: "/manage-mechanics", element: <Mechanics/>, errorElement: <ErrorPage/>}
];

export default routes;
