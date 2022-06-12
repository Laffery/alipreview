import { getCommentsById } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import useTitle from "@/hooks/use-title";
import StoryItem from "@/components/list/item";
import "./index.css";

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
            {Object.values(comments).map((comment) => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.text}</td>
              </tr>
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
