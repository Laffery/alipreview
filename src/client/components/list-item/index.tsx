import { Story } from "hackernews";
import { ago, plural, host } from "@/utils";
import "./index.css";

interface ItemProps {
  data: Story;
  rank: number;
}

const StoryItem = ({ rank, data }: ItemProps) => {
  const SiteTag = () => {
    if (!data.url) return null;
    return (
      <>
        {" ("}
        <a href={`from?site=${data.url}`}>
          <span className="site-str">{host(data.url)}</span>
        </a>
        {")"}
      </>
    );
  };

  return (
    <>
      <tr className="item-header">
        <td className="title vertical-align-top text-align-right">
          <span>{rank}.</span>
        </td>
        <td>
          <a href="/">
            <div className="vote-arrow" />
          </a>
        </td>
        <td className="title">
          <a href={data.url ?? `/item?id=${data.id}`} className="title-link">
            {data.title}
          </a>
          <span className="sitebit comhead">
            <SiteTag />
          </span>
        </td>
      </tr>
      <tr className="item-footer">
        <td colSpan={2}></td>
        <td className="subtext">
          <span className="score">
            {data.score} point{plural(data.score)}
          </span>
          <span>
            {" by "}
            <a className="user" href="/">
              {data.by}
            </a>
          </span>{" "}
          <span className="age">
            <a href="/">{ago(data.time)}</a>
          </span>
          {" | "}
          <a href="/">hide</a>
          {" | "}
          <a href="/">
            {data.descendants}&nbsp;comment{plural(data.descendants)}
          </a>
        </td>
      </tr>
      <tr className="spacer"></tr>
    </>
  );
};

export default StoryItem;