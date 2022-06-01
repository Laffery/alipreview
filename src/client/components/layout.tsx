import Header from "./header";
import Footer from "./footer";

function Layout({
  children,
  header,
  footer = true,
}: JSX.IntrinsicElements["div"] & {
  header?: string;
  footer?: boolean;
}) {
  return (
    <table id="root" className="full-width">
      <tbody className="full-width">
        <tr className="full-width">
          <td style={{ backgroundColor: "#ff6600" }}>
            {header ? <Header.Message text={header} /> : <Header />}
          </td>
        </tr>
        <tr>
          <td>{children}</td>
        </tr>
        {footer && (
          <tr className="full-width" style={{ textAlign: "center" }}>
            <td>
              <Footer />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Layout;
