import { ReactElement } from "react";
import Text from "./Text";
import { ICards } from "../../server/cards/cards.model";

const text = {
  labelFofura: "Fofura",
  labelLifeSpan: "Life Span",
  labelFome: "Fome",
  labelBrincalhao: "Brincalão",
  labelBeleza: "Beleza",
};

const Carta = ({
  name,
  image,
  fofura,
  life_span,
  fome,
  brincalhao,
  beleza,
}: ICards) => {
  return (
    <div className={"m-5 bg-orange-500 border border-orange-700 rounded-xl"}>
      <div
        className={
          "w-full text-xl bg-opacity-75 text-center bg-white border border-orange-700 rounded-t-xl"
        }
      >
        {name}
      </div>
      <img className={"w-full"} src={image} />
      <div className={"mx-8 grid my-2 grid-cols-1"}>
        <div
          className={"flex justify-between hover:bg-orange-700 rounded-xl p-1"}
          onClick={() => console.log("Clicou")}
        >
          <Text className={" text-xl"} text={text.labelFofura} />
          <Text className={" text-xl"} text={`${fofura}`} />
        </div>
        <div
          className={"flex justify-between hover:bg-orange-700 rounded-xl p-1"}
          onClick={() => console.log("Clicou")}
        >
          <Text className={" text-xl"} text={text.labelLifeSpan} />
          <Text className={" text-xl"} text={`${life_span}`} />
        </div>
        <div
          className={"flex justify-between hover:bg-orange-700 rounded-xl p-1"}
          onClick={() => console.log("Clicou")}
        >
          <Text className={" text-xl"} text={text.labelFome} />
          <Text className={" text-xl"} text={`${fome}`} />
        </div>
        <div
          className={"flex justify-between hover:bg-orange-700 rounded-xl p-1"}
          onClick={() => console.log("Clicou")}
        >
          <Text className={" text-xl"} text={text.labelBrincalhao} />
          <Text className={" text-xl"} text={`${brincalhao}`} />
        </div>
        <div
          className={"flex justify-between hover:bg-orange-700 rounded-xl p-1"}
          onClick={() => console.log("Clicou")}
        >
          <Text className={" text-xl"} text={text.labelBeleza} />
          <Text className={" text-xl"} text={`${beleza}`} />
        </div>
      </div>
    </div>
  );
};

export default Carta;
