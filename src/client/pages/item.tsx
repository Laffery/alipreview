import { getCommentsById } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import { useEffectOnce, useTitle } from "@/hooks";
import { ago } from "@/utils";
import StoryItem from "@/components/list/item";
import { Interweave } from "interweave";
import { useToggle } from "ahooks";
import { useCallback } from "react";
import "./index.css";

function CommentEditor() {
  return (
    <form>
      <textarea rows={8} cols={80} />
      <br />
      <br />
      <input
        type="submit"
        style={{ fontFamily: "monospace" }}
        value="add comment"
      />
    </form>
  );
}

function CommentTree({
  data,
  comments,
}: {
  data: HNItemBase;
  comments: HNItemMap<Comment>;
}) {
  const kids = data.kids ?? [];

  const getCommentChildrenCount = useCallback(
    (id: Comment["id"]) => {
      const getChildrenCount = (id: Comment["id"]) => {
        const comment = comments[id];
        const kids = comment.kids ?? [];
        let sum = 1; // 1 for the comment itself
        kids.forEach((kid) => void (sum += getChildrenCount(kid)));
        return sum;
      };
      return getChildrenCount(id);
    },
    [comments]
  );

  useEffectOnce(() => {
    const onHashChanged = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = parseInt(hash.slice(1), 10);
        const comment = comments[id];
        if (comment) {
          const el = document.getElementById(`${id}`);
          if (el) el.scrollIntoView();
        }
      }
    };

    window.addEventListener("hashchange", onHashChanged);
    return () => {
      window.removeEventListener("hashchange", onHashChanged);
    };
  });

  // link in comment item's header
  const Link = (props: { href: string; text?: string }) => {
    const { href, text } = props;
    return (
      <>
        <a href={href}>{text}</a>
        {" | "}
      </>
    );
  };

  function CommentItem(props: {
    comment: Comment;
    root?: number;
    parent?: number;
    indent?: number;
    prev?: number;
    next?: number;
  }) {
    const { comment, indent = 0, root, parent, prev, next } = props;
    const kids = comment.kids ?? [];
    const [collapsed, { toggle }] = useToggle(false);
    const replyHref = `/reply?id=${comment.id}&goto=${encodeURIComponent(
      `/item${data.id}#${comment.id}`
    )}`;

    return (
      <>
        <tr key={comment.id} id={`${comment.id}`}>
          <td>
            <table className="comment">
              <tbody>
                <tr>
                  <td width={2 + 40 * indent}>
                    <img
                      src="https://news.ycombinator.com/s.gif"
                      alt="indent"
                      height={1}
                      width={0}
                    />
                  </td>
                  <td className="vote-links">
                    {!collapsed && <div className="vote-arrow" />}
                  </td>
                  <td className="default">
                    <section>
                      <header>
                        <a href={`/user?id=${comment.by}`}>{comment.by}</a>
                        &nbsp;
                        <Link
                          href={`/item?id=${comment.id}`}
                          text={ago(comment.time)}
                        />
                        {indent > 1 && root !== undefined && (
                          <Link
                            href={`/item?id=${data.id}#${root}`}
                            text="root"
                          />
                        )}
                        {parent !== undefined && (
                          <Link
                            href={`/item?id=${data.id}#${parent}`}
                            text="parent"
                          />
                        )}
                        {prev !== undefined && (
                          <Link
                            href={`/item?id=${data.id}#${prev}`}
                            text="prev"
                          />
                        )}
                        {next !== undefined && (
                          <Link
                            href={`/item?id=${data.id}#${next}`}
                            text="next"
                          />
                        )}
                        <span>
                          [
                          <a onClick={toggle} href="javascript:void(0)">
                            {collapsed
                              ? `${getCommentChildrenCount(comment.id)} more`
                              : "-"}
                          </a>
                          ]
                        </span>
                      </header>
                      {!collapsed && (
                        <main className="comment-text">
                          <Interweave content={comment.text} />
                          <div className="reply">
                            <a href={replyHref}>reply</a>
                          </div>
                        </main>
                      )}
                    </section>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        {!collapsed &&
          kids.map((id, index) => (
            <CommentItem
              key={id}
              comment={comments[id]}
              indent={indent + 1}
              root={root}
              parent={comment.id}
              next={
                index + 1 < kids.length - 1
                  ? comments[kids[index + 1]].id
                  : undefined
              }
              prev={index - 1 >= 0 ? comments[kids[index - 1]].id : undefined}
            />
          ))}
      </>
    );
  }

  return (
    <table className="comment-tree" id="comment-scroll">
      <tbody>
        {kids.map((id, index) => (
          <CommentItem
            key={id}
            comment={comments[id]}
            root={id}
            next={
              index + 1 < kids.length - 1
                ? comments[kids[index + 1]].id
                : undefined
            }
            prev={index - 1 >= 0 ? comments[kids[index - 1]].id : undefined}
          />
        ))}
      </tbody>
    </table>
  );
}

function StoryItemPage({
  data,
  comments,
}: {
  data: Story;
  comments: HNItemMap<Comment>;
}) {
  useTitle(`${data.title} | Hacker News`);

  return (
    <div className="App">
      <Layout>
        <table style={{ marginTop: 10 }} className="full-width">
          <tbody className="story-item">
            <StoryItem data={data} hidable />
            <tr style={{ height: 10 }} />
            <tr>
              <td colSpan={2} />
              <td>
                <CommentEditor />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <CommentTree data={data} comments={comments} />
        <br />
        <br />
      </Layout>
    </div>
  );
}

function CommentItemPage({
  data,
  comments,
}: {
  data: Comment;
  comments: HNItemMap<Comment>;
}) {
  useTitle(`${data.text} | Hacker News`);

  return (
    <div className="App">
      <Layout>
        <table style={{ marginTop: 10 }} className="full-width">
          <tbody>
            <StoryItem data={data} hidable />
            <tr style={{ height: 10 }} />
            <tr>
              <td colSpan={2} />
              <td>
                <CommentEditor />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <CommentTree data={data} comments={comments} />
        <br />
        <br />
      </Layout>
    </div>
  );
}

function ItemPage({
  data,
  comments,
}: {
  data: HNItemBase;
  comments: { [id: number]: Comment };
}) {
  if (data.type === "story")
    return <StoryItemPage data={data as Story} comments={comments} />;
  if (data.type === "comment")
    return <CommentItemPage data={data as Comment} comments={comments} />;
  return null;
}

export default ItemPage;

export const getServerSideProps: GetServerSideProps<{
  data: Story | null;
  comments: { [id: number]: Comment };
}> = async (ctx) => {
  if (ctx.query.id && Number.isInteger(Number(ctx.query.id))) {
    const id = Number(ctx.query.id);
    const { parent, comments } = await firstValueFrom(getCommentsById(id));
    return { props: { data: parent, comments } };
  }
  return { props: { data: null, comments: {} } };
};
