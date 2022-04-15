import "./index.css";
import { Story } from "hackernews";
import { getJobsStories } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import useTitle from "@/hooks/use-title";

function JobsStories({ data = [] }: { data: Story[] }) {
  useTitle("jobs | Hacker News");
  return (
    <div className="App">
      <Layout data={data} hidable={false} />
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
