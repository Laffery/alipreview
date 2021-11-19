import { TableHTMLAttributes } from "react";
import "./index.css";

type ItemProps = {
  id?: string;
  rank?: number;
  title?: string;
  voteLink?: string;
  points?: number;
  user?: string;
  age?: string;
  comments?: number;
};

const Item = ({
  rank,
  id = "u_21415",
  title = "Hackerrank DMCA Notice",
  voteLink = "https://news.ycombinator.com/item?id=21415",
  points = 127,
  user = "ssa",
  age = "2 hours ago",
  comments = 112,
}: ItemProps) => {
  return (
    <>
      <tr className="item-header">
        <td className="title vertical-align-top text-align-right">
          <span>{`${rank}.`}</span>
        </td>
        <td>
          <a id={id} href={voteLink}>
            <div className="vote-arrow" />
          </a>
        </td>
        <td className="title">
          <a
            href="https://github.com/github/dmca/blob/master/2021/11/2021-11-12-hackerrank.md"
            className="title-link"
          >
            {title}
          </a>
          <span className="sitebit comhead">
            {" ("}
            <a href="from?site=github.com/github">
              <span className="site-str">github.com/github</span>
            </a>
            {")"}
          </span>
        </td>
      </tr>
      <tr className="item-footer">
        <td colSpan={2}></td>
        <td className="subtext">
          <span className="score">{points} points</span>
          {" by "}
          <a className="user" href="/">
            {user}
          </a>
          <span className="age">
            <a href="/">{age}</a>
          </span>
          {" | "}
          <a href="/">hide</a>
          {" | "}
          <a href="/">{comments}&nbsp;comments</a>
        </td>
      </tr>
      <tr className="spacer"></tr>
    </>
  );
};

const list = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
];

export default function List(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table {...props}>
      <tbody>
        {list.map((item, index) => (
          <Item key={index} rank={item + 1} />
        ))}
        <tr className="more-space"></tr>
        <tr>
          <td colSpan={2}></td>
          <td>More</td>
        </tr>
      </tbody>
    </table>
  );
}
