import { ReactNode } from "react";
import Layout from "@/components/layout";
import { useTitle } from "@/hooks";
import "./index.css";

type ListItem = { href: string; alt: string; description: ReactNode };

const lists: ListItem[] = [
  {
    alt: "front",
    href: "/front",
    description: (
      <>
        Front page submissions for a given day (e.g.&nbsp;
        <a href="front?day=2016-06-20">2016-06-20</a>)
      </>
    ),
  },
  {
    alt: "pool",
    href: "/pool",
    description: (
      <>
        Links selected for a&nbsp;
        <a href="https://news.ycombinator.com/item?id=26998308">
          second chance
        </a>
        &nbsp; at the front page
      </>
    ),
  },
  {
    alt: "invited",
    href: "/invited",
    description: "Overlooked links, invited to repost",
  },
  { alt: "best", href: "/best", description: "Highest-voted recent links" },
  {
    alt: "active",
    href: "/active",
    description: "Most active current discussions",
  },
  {
    alt: "bestcomments",
    href: "/bestcomments",
    description: "Highest-voted recent comments",
  },
  {
    alt: "asknew",
    href: "/asknew",
    description: (
      <>
        The latest <a href="/ask">Ask HN</a> (i.e. text) posts
      </>
    ),
  },
  {
    alt: "shownew",
    href: "/shownew",
    description: (
      <>
        The latest <a href="/show">Show HN</a> posts
      </>
    ),
  },
  {
    alt: "noobstories",
    href: "/noobstories",
    description: "Submissions from new accounts",
  },
  {
    alt: "noobcomments",
    href: "/noobcomments",
    description: "Comments from new accounts",
  },
  {
    alt: "leaders",
    href: "/leaders",
    description: "Users with most karma",
  },
  {
    alt: "whoishiring",
    href: "/submitted?id=whoishiring",
    // eslint-disable-next-line quotes
    description: 'Monthly "Who Is Hiring" threads',
  },
  {
    alt: "launches",
    href: "/launches",
    description: "Launches of YC startups",
  },
];

function Lists() {
  useTitle("Lists | Hacker News");

  return (
    <div className="App">
      <Layout>
        <section id="lists">
          <table>
            <tbody>
              {lists.map((item, index) => (
                <tr className="list-item" key={index}>
                  <td>
                    <a href={item.href}>{item.alt}</a>
                  </td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Layout>
    </div>
  );
}

export default Lists;
