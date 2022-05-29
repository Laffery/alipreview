import Header from "./header";
import Footer from "./footer";

function Layout({ children }: JSX.IntrinsicElements["div"]) {
  return (
    <table id="root" className="full-width">
      <tbody className="full-width">
        <tr className="full-width">
          <td style={{ backgroundColor: "#ff6600" }}>
            <Header />
          </td>
        </tr>
        <tr>
          <td>{children}</td>
        </tr>
        <tr className="full-width" style={{ textAlign: "center" }}>
          <td>
            <Footer />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Layout;
