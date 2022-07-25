import "./index.css";
import { getNewestStories } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import { useTitle } from "@/hooks";
import StoryList from "@/components/list";

function NewestStories({ data = [] }: { data: Story[] }) {
  useTitle("New Links | Hacker News");
  return (
    <div className="App">
      <Layout>
        <StoryList data={data} hidable={false} />
      </Layout>
    </div>
  );
}

export default NewestStories;

export const getServerSideProps: GetServerSideProps<{
  data: Story[];
}> = async () => {
  const source$ = getNewestStories();
  return { props: { data: await firstValueFrom(source$) } };
};
