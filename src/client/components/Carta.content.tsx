import { ICards } from "../../server/cards/cards.model";
import Text from "./Text";
interface CardLineInterface {
  row1: string | number;
  row2: string | number;
  onClick?: () => {};
  lineDisabled?: boolean;
}

const text = {
  labelFofura: "Fofura",
  labelLifeSpan: "Life Span",
  labelFome: "Fome",
  labelBrincalhao: "Brincalão",
  labelBeleza: "Beleza",
};

type CartaContainerInercafe = ICards & { lineDisabled?: boolean };

const CartaContent = ({
  name,
  image,
  fofura,
  life_span,
  fome,
  brincalhao,
  beleza,
  lineDisabled = true,
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
      <img className={"w-full"} src={image} />
      <div className={"mx-8 grid my-2 grid-cols-1"}>
        <CardLine
          row1={text.labelFofura}
          row2={fofura}
          lineDisabled={lineDisabled}
        />
        <CardLine
          row1={text.labelLifeSpan}
          row2={life_span}
          lineDisabled={lineDisabled}
        />
        <CardLine
          row1={text.labelFome}
          row2={fome}
          lineDisabled={lineDisabled}
        />
        <CardLine
          row1={text.labelBrincalhao}
          row2={brincalhao}
          lineDisabled={lineDisabled}
        />
        <CardLine
          row1={text.labelBeleza}
          row2={beleza}
          lineDisabled={lineDisabled}
        />
      </div>
    </>
  );
};

const CardLine = ({ row1, row2, onClick, lineDisabled }: CardLineInterface) => {
  return (
    <div
      className={
        lineDisabled
          ? "flex justify-between rounded-xl p-1"
          : "flex justify-between hover:bg-orange-700 rounded-xl p-1"
      }
      onClick={onClick}
    >
      <Text className={" text-xl"} text={`${row1}`} />
      <Text className={" text-xl"} text={`${row2}`} />
    </div>
  );
};

export default CartaContent;
