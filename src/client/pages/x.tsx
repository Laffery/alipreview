import Header from "@/components/header";
import { useEffect } from "react";
import "./index.css";

function X() {
  useEffect(() => {
    // 更新浏览器标签页title
    document.title = "Message | Hacker News";
  }, []);

  return (
    <div className="App">
      <table id="root" className="full-width">
        <tbody className="full-width">
          <tr className="full-width">
            <td style={{ backgroundColor: "#ff6600" }}>
              <Header title="Message" tabs={false} auth={false} />
            </td>
          </tr>
          <tr id="page-space" style={{ height: 10 }}></tr>
          <tr>
            <td>
              <table width={500} style={{ margin: "auto" }}>
                <tbody>
                  <tr>
                    <td style={{ fontSize: "8.5pt", color: "#000000" }}>
                      {`Sorry, there's no email address in the profile so we can't send you
            a reset link.`}
                      <br />
                      <br />
                      {`You're welcome to contact us at hn@ycombinator.com.
            Assuming you're the account owner, there's usually something we can
            do.`}
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default X;
