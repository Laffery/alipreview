import * as api from "app/api";
import { Suspense, TableHTMLAttributes, useEffect, useState } from "react";
import * as rx from "rxjs";
import { switchMap, catchError, map } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import "./index.css";
import ago from "utils/date";

interface Item {
  id: number;
  by?: string;
  descendants?: number;
  kids?: number[];
  score?: number;
  text?: string;
  time?: number;
  title?: string;
  type?: string;
}

type ItemProps = {
  id: number;
  rank: number;
};

const StoryItem = ({ rank, id = 21415 }: ItemProps) => {
  const [data, setData] = useState<Item>({ id });
  useEffect(() => {
    fromFetch(api.item(id))
      .pipe(
        switchMap((res) => {
          if (res.ok) return res.json();
          else return rx.of({ error: true, message: `Error ${res.status}` });
        }),
        catchError((err) => {
          console.error(err);
          return rx.of({ error: true, message: err.message });
        })
      )
      .subscribe(setData);
  }, [id]);

  return (
    <Suspense fallback={<></>}>
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
          <a
            href="https://github.com/github/dmca/blob/master/2021/11/2021-11-12-hackerrank.md"
            className="title-link"
          >
            {data.title}
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
          <span className="score">{data.score} points</span>
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
          <a href="/">comments&nbsp;comments</a>
        </td>
      </tr>
      <tr className="spacer"></tr>
    </Suspense>
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
