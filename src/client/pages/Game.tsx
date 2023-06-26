import { useState } from "react";
import { ICards } from "../../server/cards/cards.model";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import Carta from "../components/Carta";
import CartaContent from "../components/Carta.content";
import Logo from "../assets/img/logo.png";
import FlipedCard from "../components/FlipedCard";

const text = {
  labelMyCards: "Minhas cartas",
  labelOponentCards: "Cartas Oponente",
  labelButtonNext: "Next",
};

export const initialCard = {
  name: "Null",
  image: "./dragon.jpg",
  fofura: 0,
  life_span: 0,
  fome: 0,
  brincalhao: 0,
  beleza: 0,
};

const Game = ({}) => {
  const [card, setCard] = useState<ICards>(initialCard);
  const [flip, setFlip] = useState(false);
  // const carregaCards = async () => {
  //   const response = await api.get("/cards");
  //   let cartas: ICards[] = [];
  //   Object.keys(response.data.data).map((key) => {
  //     cartas.push(response.data.data[key]);
  //   });
  //   setCards(cartas);
  // };

  return (
    <>
      <Container
        type={"large"}
        content={
          <>
            {/* ///////////////////////////////////////////Oponente //////////////////////////////*/}
            <div className={"hidden sm:block  absolute top-0 left-0"}>
              <Card title={text.labelOponentCards} content={0} />
            </div>
            <div
              className={
                "grid grid-cols-2  gap-4 text-center sm:hidden  absolute top-0 w-full bg-orange-500 border border-orange-700 rounded-xl"
              }
            >
              <span
                className={
                  "self-center text-xl bg-opacity-75 text-center border-orange-700 rounded-xl"
                }
              >
                {text.labelOponentCards}
              </span>
              <span className={"my-2 text-xl self-center"}>{0}</span>
            </div>
            {/* ///////////////////////////////////////////Cards //////////////////////////////*/}
            <div className={"h-full w-full flex justify-center items-center"}>
              {/* <div
                className={
                  "m-5 bg-orange-500 border border-orange-700  rounded-xl w-52 h-[calc(430px)] flex items-center"
                }
              > */}
              <FlipedCard
                src={Logo}
                content={
                  <CartaContent
                    name={card.name}
                    image={card.image}
                    fofura={card.fofura}
                    life_span={card.life_span}
                    fome={card.fome}
                    brincalhao={card.brincalhao}
                    beleza={card.beleza}
                    lineDisabled={true}
                  />
                }
                flip={flip}
              />
              {/* <img src={Logo} /> */}
              {/* </div> */}
              <div
                className={
                  "m-5 bg-orange-500 border border-orange-700  rounded-xl w-52 h-[calc(430px)] "
                }
              >
                <CartaContent
                  name={card.name}
                  image={card.image}
                  fofura={card.fofura}
                  life_span={card.life_span}
                  fome={card.fome}
                  brincalhao={card.brincalhao}
                  beleza={card.beleza}
                  lineDisabled={false}
                />
              </div>
            </div>
            {/* ///////////////////////////////////////////Jogador //////////////////////////////*/}
            {/* <div
              className={
                "m-5 bg-orange-500 border border-orange-700  rounded-xl w-52 "
              }
            >
              <CartaContent
                name={card.name}
                image={card.image}
                fofura={card.fofura}
                life_span={card.life_span}
                fome={card.fome}
                brincalhao={card.brincalhao}
                beleza={card.beleza}
              />
            </div> */}
            <div className={"hidden sm:block  absolute bottom-0 right-0"}>
              <Card
                title={text.labelMyCards}
                content={0}
                botton={
                  <Button
                    title={text.labelButtonNext}
                    onClick={() => setFlip(!flip)}
                  />
                }
              />
            </div>
            <div
              className={
                "grid grid-cols-3  gap-4 text-center sm:hidden  absolute bottom-0 w-full bg-orange-500 border border-orange-700 rounded-xl"
              }
            >
              <span
                className={
                  "self-center text-xl bg-opacity-75 text-center border-orange-700 rounded-xl"
                }
              >
                {text.labelMyCards}
              </span>
              <span className={"my-2 text-xl self-center"}>{0}</span>
              <Button title={text.labelButtonNext} className={"!m-0 !w-full"} />
            </div>
          </>
        }
      />
    </>
  );
};

export default Game;
