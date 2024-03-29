import "./index.css";
import { getShowStories } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import { useTitle } from "@/hooks";
import StoryList from "@/components/list";

function ShowStories({ data = [] }: { data: Story[] }) {
  useTitle("Show | Hacker News");
  return (
    <div className="App">
      <Layout>
        <StoryList data={data} hidable={false} />
      </Layout>
    </div>
  );
}

export default ShowStories;

export const getServerSideProps: GetServerSideProps<{
  data: Story[];
}> = async () => {
  const source$ = getShowStories();
  return { props: { data: await firstValueFrom(source$) } };
};
