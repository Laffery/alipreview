import React from "react";
import { Context, getInitialContextValue, useContext } from "@/context";
import ReactDOM from "react-dom/client";
import "./index.css";

function Page() {
  const { props } = useContext(Context);
  const Page = require(`./pages${window.location.pathname}`).default;
  return <Page {...props} />;
}

function App() {
  const initialContextValue = getInitialContextValue();
  return (
    <React.StrictMode>
      <Context.Provider value={initialContextValue}>
        <Page />
      </Context.Provider>
    </React.StrictMode>
  );
}

function render() {
  const container = document.getElementById("root") as HTMLDivElement;

  if (window && window.SSR) {
    ReactDOM.hydrateRoot(container, <App />);
  } else {
    ReactDOM.createRoot(container).render(<App />);
  }
}

render();
