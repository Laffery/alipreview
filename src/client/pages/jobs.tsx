import "./index.css";
import { getJobsStories } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import useTitle from "@/hooks/use-title";
import StoryList from "@/components/list";

function JobsStories({ data = [] }: { data: Story[] }) {
  useTitle("jobs | Hacker News");
  return (
    <div className="App">
      <Layout>
        <StoryList data={data} hidable={false} />
      </Layout>
    </div>
  );
}

export default JobsStories;

export const getServerSideProps: GetServerSideProps<{
  data: Story[];
}> = async () => {
  const source$ = getJobsStories();
  return { props: { data: await firstValueFrom(source$) } };
};
