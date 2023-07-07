//this page displays the error message incase of wrong route

import { Link } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
// using the <Link> element under react router dom to navigate to another page by clicking on it
export default function ErrorPage(props) {
  const { userSession } = useAuth();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      {!userSession ? (
        <>
          <p>Looks like you're not logged in. Please log in first to access this page</p>
          <p>
            {/* redirecting to home page */}
            <Link to="/signin">Sign In</Link>, or <Link to="/signup">Sign Up</Link>
          </p>
        </>
      ) : (
        <p>Looks like you reached a page that doesn't exist.</p>
      )}
      <p>
        {/* redirecting to home page */}
        Go back to safety <Link to="/">Home</Link>
      </p>
    </div>
  );
}
