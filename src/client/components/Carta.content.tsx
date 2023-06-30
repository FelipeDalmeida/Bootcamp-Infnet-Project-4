import { useEffect, useState } from "react";
import { ICards } from "../../server/cards/cards.model";
import { Atributo } from "../pages/Game";
import Text from "./Text";
import { delay } from "../service/delay";
interface CardLineInterface {
  row1: string | number;
  row2: string | number;
  lineDisabled?: boolean;
  isFlip?: boolean;
}

const text = {
  labelFofura: "Fofura",
  labelLifeSpan: "Life Span",
  labelFome: "Fome",
  labelBrincalhao: "Brincalhão",
  labelBeleza: "Beleza",
};

type CartaContainerInercafe = ICards & {
  lineDisabled?: boolean;
  isFlip?: boolean; //Usado para resetar o outline
  playFofura?: (e: React.FormEvent<HTMLFormElement>) => {};
  playLifeSpan?: (e: React.FormEvent<HTMLFormElement>) => {};
  playLifeFome?: (e: React.FormEvent<HTMLFormElement>) => {};
  playBrincalhao?: (e: React.FormEvent<HTMLFormElement>) => {};
  playBeleza?: (e: React.FormEvent<HTMLFormElement>) => {};
};

const CartaContent = ({
  name,
  image,
  fofura,
  life_span,
  fome,
  brincalhao,
  beleza,
  lineDisabled = true,
  isFlip,
  playFofura,
  playLifeSpan,
  playLifeFome,
  playBrincalhao,
  playBeleza,
}: CartaContainerInercafe) => {
  return (
    <>
      <div
        className={
          "w-full text-xl bg-opacity-75 text-center bg-white border border-orange-700 rounded-t-xl"
        }
      >
        {name}
      </div>
      <img className={"w-full h-[calc(200px)]"} src={image} />
      <div className={"mx-8 grid my-2 grid-cols-1"}>
        <div onClick={playFofura ? playFofura : () => {}}>
          <CardLine
            row1={text.labelFofura}
            row2={fofura}
            lineDisabled={lineDisabled}
            isFlip={isFlip}
          />
        </div>
        <div onClick={playLifeSpan ? playLifeSpan : () => {}}>
          <CardLine
            row1={text.labelLifeSpan}
            row2={life_span}
            lineDisabled={lineDisabled}
            isFlip={isFlip}
          />
        </div>
        <div onClick={playLifeFome ? playLifeFome : () => {}}>
          <CardLine
            row1={text.labelFome}
            row2={fome}
            lineDisabled={lineDisabled}
            isFlip={isFlip}
          />
        </div>
        <div onClick={playBrincalhao ? playBrincalhao : () => {}}>
          <CardLine
            row1={text.labelBrincalhao}
            row2={brincalhao}
            lineDisabled={lineDisabled}
            isFlip={isFlip}
          />
        </div>
        <div onClick={playBeleza ? playBeleza : () => {}}>
          <CardLine
            row1={text.labelBeleza}
            row2={beleza}
            lineDisabled={lineDisabled}
            isFlip={isFlip}
          />
        </div>
      </div>
    </>
  );
};

const CardLine = ({ row1, row2, lineDisabled, isFlip }: CardLineInterface) => {
  const [outline, setOutline] = useState(false);

  useEffect(() => {
    setOutline(false);
  }, [isFlip]);
  return (
    <div
      className={
        lineDisabled
          ? "flex justify-between rounded-xl p-1"
          : `flex justify-between hover:bg-orange-700 rounded-xl p-1 hover:!outline cursor-pointer ${
              outline && isFlip ? "outline bg-orange-700" : ""
            }`
      }
      onClick={() => setOutline(!outline)}
    >
      <Text className={" text-xl"} text={`${row1}`} />
      <Text className={" text-xl"} text={`${row2}`} />
    </div>
  );
};

export default CartaContent;
