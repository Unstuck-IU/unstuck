//this page displays the error message incase of wrong route

import { Link } from "react-router-dom";
// using the <Link> element under react router dom to navigate to another page by clicking on it
export default function ErrorPage(props) {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Looks like you reached a page that doesn't exist.</p>
      <p>
        {/* redirecting to home page */}
        Go back to safety <Link to="/">Home</Link>
      </p>
    </div>
  );
}
