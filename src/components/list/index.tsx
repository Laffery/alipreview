import * as api from "app/api";
import { TableHTMLAttributes, useEffect, useState } from "react";
import * as rx from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { Item } from "hackernews";
import { ago, plural, host } from "utils";
import "./index.css";

interface ItemProps {
  // id: number;
  data: Item;
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

export default function List(props: TableHTMLAttributes<HTMLTableElement>) {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    fromFetch(api.getTopStoriesIdsUrl, {
      async selector(res) {
        const data: number[] = await res.json();
        return data.slice(0, 30);
      },
    }).subscribe((items) => {
      rx.forkJoin(
        items.map((id) =>
          fromFetch(api.getStoryByIdUrl(id), {
            selector: (res) => res.json() as Promise<Item>,
          })
        )
      ).subscribe(setItems);
    });
  }, []);

  return (
    <table {...props}>
      <tbody>
        {items.map((item, index) => (
          <StoryItem key={index} data={item} rank={index + 1} />
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
