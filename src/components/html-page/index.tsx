import { ReactNode } from "react";
import "./index.css";

function HTMLPage({
  article,
  footSeparator = false,
}: {
  article: ReactNode;
  footSeparator?: boolean;
}) {
  return (
    <table id="html-page">
      <br />
      <br />
      <tbody className="full-width">
        <tr className="full-width">
          <td className="article">
            <a>
              <img
                src="https://news.ycombinator.com/yc500.gif"
                alt="header img"
                width={500}
              />
            </a>

            {article}

            {footSeparator && (
              <>
                <table style={{ backgroundColor: "#ff6600", width: "100%" }}>
                  <tbody>
                    <tr>
                      <td className="separator"></td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  <span>
                    <br />
                    <br />
                  </span>
                </p>
              </>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default HTMLPage;
