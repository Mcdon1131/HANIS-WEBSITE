import { Component } from "react";

// If any component crashes, show the error on screen instead of a blank page.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div style={{ maxWidth: 720, margin: "60px auto", padding: 20, fontFamily: "sans-serif" }}>
        <h1>Something broke</h1>
        <p>Copy the text below and send it to whoever is helping you:</p>
        <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: 16, borderRadius: 8 }}>
          {String(error?.stack || error)}
        </pre>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }
}
