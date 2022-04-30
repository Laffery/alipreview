import "./index.css";
import { getShowStories } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import useTitle from "@/hooks/use-title";

function ShowStories({ data = [] }: { data: Story[] }) {
  useTitle("Show | Hacker News");
  return (
    <div className="App">
      <Layout data={data} hidable={false} />
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
