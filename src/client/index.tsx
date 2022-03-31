import React, { createContext, lazy, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Context = createContext({ props: {} });

const getInitialContextValue = () => {
  return window && window.SSR_DATA ? window.SSR_DATA : { props: {} };
};

function Page() {
  const { props } = useContext(Context);
  const Page = lazy(() => import(`./pages${window.location.pathname}`));
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
