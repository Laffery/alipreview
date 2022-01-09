import * as api from "app/api";
import { TableHTMLAttributes, useEffect, useState } from "react";
import * as rx from "rxjs";
import { switchMap, catchError, map } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { Item } from "hackernews";
import { ago } from "utils/date";
import { plural } from "utils/plural";
import "./index.css";

type ItemProps = {
  id: number;
  rank: number;
};

const StoryItem = ({ rank, id }: ItemProps) => {
  const [data, setData] = useState<(Item & { site: string }) | null>(null);
  useEffect(() => {
    fromFetch(api.item(id))
      .pipe(
        switchMap(async (res) => {
          if (!res.ok)
            return rx.of({ error: true, message: `Error ${res.status}` });

          return res.json();
        }),
        catchError((err) => {
          console.error(err);
          return rx.of({ error: true, message: err.message });
        }),
        map((data: Item) => {
          const domains = new URL(data.url).hostname.split(".");
          domains.length > 2 && domains.shift();
          return { ...data, site: domains.join(".") };
        })
      )
      .subscribe(setData);
  }, []);

  if (!data) {
    // skeleton
    return <></>;
  }

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
          <a href={data.url} className="title-link">
            {data.title}
          </a>
          <span className="sitebit comhead">
            {" ("}
            <a href="from?site=github.com/github">
              <span className="site-str">{data.site}</span>
            </a>
            {")"}
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
  const [items, setItems] = useState<number[]>([]);
  useEffect(() => {
    fromFetch(api.top())
      .pipe(
        switchMap((res) => {
          if (res.ok) return res.json();
          else return rx.of({ error: true, message: `Error ${res.status}` });
        }),
        catchError((err) => {
          console.error(err);
          return rx.of({ error: true, message: err.message });
        }),
        map((value: number[]) => value.slice(0, 30))
      )
      .subscribe(setItems);
  }, []);

  return (
    <table {...props}>
      <tbody>
        {items.map((item, index) => (
          <StoryItem key={index} id={item} rank={index + 1} />
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
