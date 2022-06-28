import useAuth from "@/hooks/use-auth";
import useLocation from "@/hooks/use-location";
import { findIndex } from "lodash";
import { useMemo } from "react";
import { classNames } from "@/utils";
import "./index.css";

interface NavItem {
  href: string;
  text: string;
  auth?: boolean; // need login
  lastItem?: boolean;
  currItem?: boolean;
}

const nav: NavItem[] = [
  { href: "newest", text: "new" },
  { href: "threads", text: "threads", auth: true },
  { href: "front", text: "past" },
  { href: "newcomments", text: "comments" },
  { href: "ask", text: "ask" },
  { href: "show", text: "show" },
  { href: "jobs", text: "jobs" },
  { href: "submit", text: "submit", lastItem: true },
];

/**
 * 解析location中的一级路径
 * @param location 从useLocation获取的location pathname
 */
const primaryPath = (location: string): string => {
  const paths = /^\/([\w\d]*)(\/[\w\d]*)*$/.exec(location);
  return paths ? paths[1] : "";
};

function Header({
  title = "Hacker News",
  tabs = true,
  auth = true,
}: Partial<{
  title: string;
  tabs: boolean;
  auth: boolean;
}>) {
  const [user, logout] = useAuth();
  const location = useLocation();
  /**
   * @path 当前路径
   * @isAdd 是否是额外的nav
   */
  const [path, isAddon] = useMemo(() => {
    const path = primaryPath(location);
    if (!path) return [path, false];
    return [
      path,
      findIndex(nav.concat({ href: "news", text: "" }), { href: path }) ===
        -1 && !["item"].includes(path),
    ];
  }, [location]);

  const HeaderNavItem = (props: NavItem) => {
    const { href, text, lastItem = false, currItem = false } = props;
    return (
      <span className="nav-item">
        <a href={href} id={currItem ? "curr" : ""}>
          {text}
        </a>
        {!lastItem && " | "}
      </span>
    );
  };

  return (
    <div>
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
                  <a href="news">{title}</a>
                </b>
                {tabs && (
                  <>
                    {nav.map(
                      (item, index) =>
                        (!item.auth || user) && (
                          <HeaderNavItem
                            key={index}
                            {...item}
                            currItem={path === item.href}
                          />
                        )
                    )}
                    {isAddon && (
                      <span id="addon">
                        {" | "}
                        <span>{path}</span>
                      </span>
                    )}
                  </>
                )}
              </span>
            </td>
            <td id="td-3">
              <span className={classNames("pagetop", { none: !auth })}>
                {user ? (
                  <>
                    <a id="me" href={`/user?id=${user.id}`}>
                      {user.id}
                    </a>
                    {user.karma && <span id="karma">({user.karma})</span>}
                    {"| "}
                    <span id="logout" onClick={() => logout()}>
                      logout
                    </span>
                  </>
                ) : (
                  <a href="login?goto=news">login</a>
                )}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const Message = ({ text }: { text: string }) => {
  return (
    <div>
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
                <b>{text}</b>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Header.Message = Message;
export default Header;
