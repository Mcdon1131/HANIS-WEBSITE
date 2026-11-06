import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Dots overlay shown briefly on first load and on every page change.
export default function Loader() {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(false);
    document.body.classList.add("is-loading");
    const t = setTimeout(() => {
      setHidden(true);
      document.body.classList.remove("is-loading");
    }, 320);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      className={`loader ${hidden ? "hidden" : ""}`}
      role="status"
      aria-label="Loading page"
    >
      <div className="loader-content">
        <div className="loader-dots" aria-hidden="true">
          <span className="loader-dot" />
          <span className="loader-dot" />
          <span className="loader-dot" />
        </div>
      </div>
    </div>
  );
}
