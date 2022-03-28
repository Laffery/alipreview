import "./index.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { GetServerSideProps } from "app";
import { Story } from "hackernews";
import StoryItem from "@/components/list-item";
import { getTopStories } from "@/apis/server";

function App({ data: items }: { data: Story[] }) {
  return (
    <div className="App">
      <table id="root" className="full-width">
        <tbody className="full-width">
          <tr className="full-width">
            <td style={{ backgroundColor: "#ff6600" }}>
              <Header />
            </td>
          </tr>
          <tr>
            <td>
              <table style={{ marginTop: 10 }}>
                <tbody>
                  {items.map((item, index) => (
                    <StoryItem key={index} data={item} rank={index + 1} />
                  ))}
                  <tr className="more-space"></tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td>More</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr className="full-width" style={{ textAlign: "center" }}>
            <td>
              <Footer />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;

export const getServerSideProps: GetServerSideProps<{
  data: Story[];
}> = async () => {
  return { props: { data: await getTopStories() } };
};
