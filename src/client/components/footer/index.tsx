import "./index.css";

export default function Footer() {
  return (
    <div className="footer">
      <img src="https://news.ycombinator.com/s.gif" alt="footer" />
      <table className="full-width">
        <tbody>
          <tr>
            <td className="separator"></td>
          </tr>
        </tbody>
      </table>
      <br />
      <span className="yclinks">
        <a href="/newsguidelines">Guidelines</a>
        {" | "}
        <a href="/newsfaq">FAQ</a>
        {" | "}
        <a href="/lists">Lists</a>
        {" | "}
        <a href="https://github.com/HackerNews/API">API</a>
        {" | "}
        <a href="/security">Security</a>
        {" | "}
        <a href="https://www.ycombinator.com/legal">Legal</a>
        {" | "}
        <a href="https://www.ycombinator.com/apply">Apply to YC</a>
        {" | "}
        <a href="mailto:2387065420@qq.com">Contact</a>
      </span>
      <br />
      <br />
      <form method="get" action="//hn.algolia.com">
        {"Search: "}
        <input
          type="text"
          name="q"
          size={17}
          autoCorrect="off"
          spellCheck="false"
          autoCapitalize="false"
          autoComplete="false"
        />
      </form>
    </div>
  );
}
