import NavBar from "../components/Navbar";

function ErrorPage() {
    
    return (
      <>
        <NavBar />
        <div className="container text-center p-5">
        <h1>Oops! Looks like something went wrong.</h1>
        </div>
      </>
    );
}
export default ErrorPage;