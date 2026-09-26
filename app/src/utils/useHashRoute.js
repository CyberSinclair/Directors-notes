import { useEffect, useState } from "react";

// Pages live in the URL hash (e.g. /#/privacy-policy) so they work on any
// static host without server-side routing, and the back button works.
function currentPath() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash.startsWith("/") ? hash : "/";
}

export function useHashRoute() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onHashChange = () => {
      setPath(currentPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return path;
}
