import { ReactElement, useState } from "react";
import Text from "./Text";
import { ICards } from "../../server/cards/cards.model";
import Modal from "./Modal";
import CartaContent from "./Carta.content";

const Carta = ({
  name,
  image,
  fofura,
  life_span,
  fome,
  brincalhao,
  beleza,
}: ICards) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        content={
          <div className={" flex justify-center"}>
            <div
              className={
                "m-5 bg-orange-500 border border-orange-700 rounded-xl w-52 h-[calc(430px)]"
              }
            >
              <CartaContent
                name={name}
                image={image}
                fofura={fofura}
                life_span={life_span}
                fome={fome}
                brincalhao={brincalhao}
                beleza={beleza}
              />
            </div>
          </div>
        }
      />
      <div
        className={
          "m-5 bg-orange-500 border border-orange-700 rounded-xl w-52 h-[calc(430px)] cursor-pointer"
        }
        onClick={() => setOpen(!open)}
      >
        <CartaContent
          name={name}
          image={image}
          fofura={fofura}
          life_span={life_span}
          fome={fome}
          brincalhao={brincalhao}
          beleza={beleza}
        />
      </div>
    </>
  );
};

export default Carta;
