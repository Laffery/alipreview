import "./index.css";
import { getTopStories } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import StoryList from "@/components/list";

function TopStories({ data = [] }: { data: Story[] }) {
  return (
    <div className="App">
      <Layout>
        <StoryList data={data} />
      </Layout>
    </div>
  );
}

export default TopStories;

export const getServerSideProps: GetServerSideProps<{
  data: Story[];
}> = async () => {
  const source$ = getTopStories();
  return { props: { data: await firstValueFrom(source$) } };
};
