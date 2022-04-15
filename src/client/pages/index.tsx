import "./index.css";
import { Story } from "hackernews";
import { getTopStories } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";

function TopStories({ data = [] }: { data: Story[] }) {
  return (
    <div className="App">
      <Layout data={data} />
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
