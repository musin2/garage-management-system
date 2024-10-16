import App from "./App.jsx"
import Appointments from "./pages/Appointments.jsx"
import Services from "./pages/Services.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const routes = [
    {path:"/", element: <App/>, errorElement: <ErrorPage/>},
    {path:"/appointments", element: <Appointments/>, errorElement: <ErrorPage/> },
    {path:"/services", element: <Services/>, errorElement: <ErrorPage/> }
];

export default routes;
