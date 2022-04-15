import Header from "./header";
import Footer from "./footer";
import StoryItem from "./list-item";
import type { Story } from "hackernews";

function Layout({
  data,
  hidable = true,
}: {
  data: Story[];
  hidable?: boolean;
}) {
  return (
    <table id="root" className="full-width">
      <tbody className="full-width">
        <tr className="full-width">
          <td style={{ backgroundColor: "#ff6600" }}>
            <Header />
          </td>
        </tr>
        <tr>
          <td>
            <table style={{ marginTop: 10 }}>
              <tbody>
                {data.map((item, index) => (
                  <StoryItem
                    key={index}
                    data={item}
                    rank={index + 1}
                    hidable={hidable}
                  />
                ))}
                <tr className="more-space"></tr>
                <tr>
                  <td colSpan={2}></td>
                  <td>More</td>
                </tr>
              </tbody>
            </table>
          </td>
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
