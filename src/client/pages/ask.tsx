import "./index.css";
import { Story } from "hackernews";
import { getAskStories } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import useTitle from "@/hooks/use-title";

function AskStories({ data = [] }: { data: Story[] }) {
  useTitle("Ask | Hacker News");
  return (
    <div className="App">
      <Layout data={data} hidable={false} />
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
