import { Link } from "react-router";

export default function FeedbackPage() {
  return (
    <main className="feedback-page page-width">
      <p className="eyebrow">NOTHING TO SEE HERE</p>
      <h1>That page is off the script.</h1>
      <p>The address may have changed, but there are plenty of stories to discover.</p>
      <Link className="button button--primary" to="/">
        Back to the home page
      </Link>
    </main>
  );
}
