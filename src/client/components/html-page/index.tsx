import useTitle from "@/hooks/use-title";
import type { ReactNode } from "react";
import "./index.css";

type HTMLPageProps = {
  article: ReactNode;
  title: string;
  footSeparator: boolean;
};

function HTMLPage({
  article,
  title = "Hacker News",
  footSeparator = false,
}: Partial<HTMLPageProps>) {
  useTitle(title);

  const FootSeparator = footSeparator ? (
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
  ) : null;

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

            {FootSeparator}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default HTMLPage;
