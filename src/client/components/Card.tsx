import { ReactElement } from "react";
import Text from "./Text";
interface CardProps {
  title: string | number;
  content?: string | number | ReactElement;
  botton?: string;
}

const Card = ({ title, content, botton }: CardProps) => {
  return (
    <div
      className={
        "m-5 bg-orange-500 border border-orange-700 rounded-xl flex flex-col items-center content-between"
      }
    >
      <span
        className={
          "w-full text-xl bg-opacity-75 text-center bg-white border border-orange-700 rounded-t-xl"
        }
      >
        {title}
      </span>
      <span className={"my-2 text-6xl"}>{content}</span>
      <Text className={"my-2 text-4xl"} text={botton} />
    </div>
  );
};

export default Card;
