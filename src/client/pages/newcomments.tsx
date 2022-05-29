import Layout from "@/components/layout";
import { firstValueFrom } from "rxjs";
import { getTopStories } from "@/apis/index";

function Comments() {
  return (
    <>
      <div className="App">
        <Layout>Hacker News API does not publicly provide this data!</Layout>
      </div>
    </>
  );
}

export default Comments;

export const getServerSideProps: GetServerSideProps<{
  data: Story[];
}> = async () => {
  const source$ = getTopStories();
  return { props: { data: await firstValueFrom(source$) } };
};
