import { getCommentsById } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import useTitle from "@/hooks/use-title";
import { ago } from "@/utils";
import StoryItem from "@/components/list/item";
import { Interweave } from "interweave";
import "./index.css";

function StoryItemPage({
  data,
  comments,
}: {
  data: Story;
  comments: HNItemMap<Comment>;
}) {
  useTitle(`${data.title} | Hacker News`);

  function CommentItem(props: { comment: Comment; indent?: number }) {
    const { comment, indent = 0 } = props;
    return (
      <>
        <tr key={comment.id}>
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
                    <div className="vote-arrow" />
                  </td>
                  <td>
                    <section>
                      <header>
                        {comment.by}&nbsp;
                        {ago(comment.time)}
                        {" | "}
                        <span>
                          next [
                          <span
                            className="toggle"
                            onClick={() => {
                              console.log("hello world");
                            }}
                          >
                            -
                          </span>
                          ]
                        </span>
                      </header>
                      <main className="comment-text">
                        <Interweave content={comment.text} />
                        <div className="reply">
                          <span>reply</span>
                        </div>
                      </main>
                    </section>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        {(comment.kids ?? []).map((id) => (
          <CommentItem key={id} comment={comments[id]} indent={indent + 1} />
        ))}
      </>
    );
  }

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
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <table className="comment-tree">
          <tbody>
            {(data.kids ?? []).map((id) => (
              <CommentItem key={id} comment={comments[id]} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}

function CommentItemPage({
  data,
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
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <table>
          <tbody>
            {(data.kids ?? []).map((id) => (
              <tr key={id} id={`${id}`}>
                {id}
              </tr>
            ))}
          </tbody>
        </table>
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
