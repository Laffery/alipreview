import "./index.css";

export default function Header() {
  return (
    <table className="header">
      <tbody>
        <tr>
          <td id="td-1">
            <a href="https://news.ycombinator.com">
              <img src="https://news.ycombinator.com/y18.gif" alt="y18" />
            </a>
          </td>

          <td id="td-2">
            <span className="pagetop">
              <b>
                <a href="news">Hacker News</a>
              </b>
              <a href="newest">new</a>
              {" | "}
              <a href="front">past</a>
              {" | "}
              <a href="newcomments">comments</a>
              {" | "}
              <a href="ask">ask</a>
              {" | "}
              <a href="show">show</a>
              {" | "}
              <a href="jobs">jobs</a>
              {" | "}
              <a href="submit">submit</a>
            </span>
          </td>
          <td id="td-3">
            <span className="pagetop">
              <a href="login?goto=news">login</a>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
