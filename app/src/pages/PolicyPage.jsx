import { useEffect, useRef } from "react";
import { site } from "../data/site";

// Shared layout for the policy pages. Focus moves to the page title on open,
// so keyboard and screen reader users start at the new content.
function PolicyPage({ title, children }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <article className="policy-page" aria-labelledby="policy-title">
      <a className="back-link" href="#/">
        ← Back to films
      </a>

      <h2 id="policy-title" ref={headingRef} tabIndex={-1}>
        {title}
      </h2>
      <p className="policy-updated">Last updated: {site.policiesLastUpdated}</p>

      {children}
    </article>
  );
}

export default PolicyPage;
