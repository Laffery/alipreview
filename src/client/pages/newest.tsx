import "./index.css";
import { Story } from "hackernews";
import { getNewestStories } from "@/apis/index";
import { firstValueFrom } from "rxjs";
import Layout from "@/components/layout";
import useTitle from "@/hooks/use-title";

function NewestStories({ data = [] }: { data: Story[] }) {
  useTitle("New Links | Hacker News");
  return (
    <div className="App">
      <Layout data={data} />
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
