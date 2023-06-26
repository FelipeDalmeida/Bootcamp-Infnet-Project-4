import "./FlipedCard.style.css";
import { ReactElement } from "react";

interface FlipedCardInterface {
  src: string;
  content: ReactElement;
  flip: boolean;
}

const FlipedCard = ({ src, content, flip }: FlipedCardInterface) => {
  return (
    <div className={`m-5 w-52 h-[calc(430px)] ${flip ? "cardflip2" : ""}`}>
      <div
        className={`flip-card-inner  rounded-xl bg-orange-500 border border-orange-700 ${
          flip ? "cardflip" : ""
        }`}
      >
        <div className="flip-card-front flex items-center">
          <img src={src} />
        </div>
        <div className="flip-card-back">{content}</div>
      </div>
    </div>
  );
};

export default FlipedCard;
