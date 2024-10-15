import App from "./App.jsx"
import Appointments from "./pages/Appointments.jsx"
import ErrorPage from "./pages/ErrorPage.jsx";

const routes = [
    {path:"/", element: <App/>, errorElement: <ErrorPage/>},
    {path:"/appointments", element: <Appointments/>, errorElement: <ErrorPage/> }
];

export default routes;
