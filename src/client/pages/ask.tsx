import "./index.css";
import { getAskStories } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import { useTitle } from "@/hooks";
import StoryList from "@/components/list";

function AskStories({ data = [] }: { data: Story[] }) {
  useTitle("Ask | Hacker News");
  return (
    <div className="App">
      <Layout>
        <StoryList data={data} hidable={false} />
      </Layout>
    </div>
  );
}

export default AskStories;

export const getServerSideProps: GetServerSideProps<{
  data: Story[];
}> = async () => {
  const source$ = getAskStories();
  return { props: { data: await firstValueFrom(source$) } };
};
