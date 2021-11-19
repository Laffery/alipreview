import "./App.css";
import Header from "./components/header";
import List from "./components/list";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <table id="root" className="full-width">
        <tbody className="full-width">
          <tr className="full-width">
            <td style={{ backgroundColor: "#ff6600" }}>
              <Header />
            </td>
          </tr>
          <tr>
            <td>
              <List style={{ marginTop: 10 }} />
            </td>
          </tr>
          <tr className="full-width" style={{ textAlign: "center" }}>
            <td>
              <Footer />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
