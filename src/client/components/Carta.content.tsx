import { useEffect, useState } from "react";
import { ICards } from "../../server/cards/cards.model";
import { Atributo } from "../pages/Game";
import Text from "./Text";
interface CardLineInterface {
  row1: string | number;
  row2: string | number;
  onClick?: () => void;
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
  setAtributo?: (atributo: Atributo) => any;
  isFlip?: boolean; //Usado para resetar o outline
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
  setAtributo,
  isFlip,
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
        <CardLine
          row1={text.labelFofura}
          row2={fofura}
          lineDisabled={lineDisabled}
          onClick={
            setAtributo ? () => setAtributo({ value: "fofura" }) : () => {}
          }
          isFlip={isFlip}
        />
        <CardLine
          row1={text.labelLifeSpan}
          row2={life_span}
          lineDisabled={lineDisabled}
          onClick={
            setAtributo ? () => setAtributo({ value: "life_span" }) : () => {}
          }
          isFlip={isFlip}
        />
        <CardLine
          row1={text.labelFome}
          row2={fome}
          lineDisabled={lineDisabled}
          onClick={
            setAtributo ? () => setAtributo({ value: "fome" }) : () => {}
          }
          isFlip={isFlip}
        />
        <CardLine
          row1={text.labelBrincalhao}
          row2={brincalhao}
          lineDisabled={lineDisabled}
          onClick={
            setAtributo ? () => setAtributo({ value: "brincalhao" }) : () => {}
          }
          isFlip={isFlip}
        />

        <CardLine
          row1={text.labelBeleza}
          row2={beleza}
          lineDisabled={lineDisabled}
          onClick={
            setAtributo ? () => setAtributo({ value: "beleza" }) : () => {}
          }
          isFlip={isFlip}
        />
      </div>
    </>
  );
};

const CardLine = ({
  row1,
  row2,
  onClick,
  lineDisabled,
  isFlip,
}: CardLineInterface) => {
  const [outline, setOutline] = useState(false);

  useEffect(() => {
    setOutline(false);
  }, [isFlip]);
  return (
    <div onClick={() => setOutline(!outline)}>
      <div
        className={
          lineDisabled
            ? "flex justify-between rounded-xl p-1"
            : `flex justify-between hover:bg-orange-700 rounded-xl p-1 hover:!outline ${
                outline && isFlip ? "outline bg-orange-700" : ""
              }`
        }
        onClick={onClick}
      >
        <Text className={" text-xl"} text={`${row1}`} />
        <Text className={" text-xl"} text={`${row2}`} />
      </div>
    </div>
  );
};

export default CartaContent;
