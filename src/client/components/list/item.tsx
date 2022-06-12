import { ago, plural, host } from "@/utils";
import "./index.css";

interface ItemProps {
  data: Story;
  rank?: number;
  hidable?: boolean;
}

const StoryItem = ({ rank, data, hidable = true }: ItemProps) => {
  const { descendants = 0, score = 0 } = data;
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
          {rank !== undefined && <span>{rank}.</span>}
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
            {score} point{plural(score)}
          </span>
          <span>
            {" by "}
            <a className="user" href="/">
              {data.by}
            </a>
          </span>{" "}
          <span className="age">
            <a href={`/item?id=${data.id}`}>{ago(data.time)}</a>
          </span>
          {hidable && (
            <>
              {" | "}
              <a href="/">hide</a>
            </>
          )}
          {descendants > 0 && (
            <>
              {" | "}
              <a href={`/item?id=${data.id}`}>
                {descendants}&nbsp;comment{plural(descendants)}
              </a>
            </>
          )}
        </td>
      </tr>
      <tr className="spacer"></tr>
    </>
  );
};

export default StoryItem;
