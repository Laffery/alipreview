import StoryItem from "./item";
import "./index.css";

interface ListProps {
  data: Story[];
  hidable?: boolean;
}

const StoryList = ({ data, hidable = true }: ListProps) => {
  return (
    <table style={{ marginTop: 10 }} className="full-width">
      <tbody>
        {data.map((item, index) => (
          <StoryItem
            key={index}
            data={item}
            rank={index + 1}
            hidable={hidable}
          />
        ))}
        <tr className="more-space"></tr>
        <tr>
          <td colSpan={2}></td>
          <td className="more">More</td>
        </tr>
      </tbody>
    </table>
  );
};

export default StoryList;
