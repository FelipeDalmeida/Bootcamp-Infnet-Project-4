import { useEffect, useState } from "react";
import { ICards } from "../../server/cards/cards.model";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import Carta from "../components/Carta";
import CartaContent from "../components/Carta.content";
import Logo from "../assets/img/logo.png";
import FlipedCard from "../components/FlipedCard";
import { api } from "../service/api/api";
import { Toast } from "../components/Toast";
import { delay } from "../service/delay";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
const text = {
  labelMyCards: "Minhas cartas",
  labelOponentCards: "Cartas Oponente",
  labelButtonNext: "Next",
  labelWinner: "Você venceu!",
  labelLoser: "Você perdeu!",
  labelPlayerTurn: "Escolha o atributo!",
  labelPCTurn: "Você perdeu, aperte Next para a próxima rodada",
  labelWinnerTurn: "Você venceu o turno",
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

export type Atributo = {
  value: "fofura" | "life_span" | "fome" | "brincalhao" | "beleza" | "";
};

const Game = ({}) => {
  const navigate = useNavigate();
  const goToPage = (page: string) => {
    navigate(`${page}`);
  };
  const [card, setCard] = useState<ICards>(initialCard);
  const [cardPC, setCardPC] = useState<ICards>(initialCard);
  const [countCard, setCountCard] = useState(0);
  const [countCardPC, setCountCardPC] = useState(0);
  const [flip, setFlip] = useState(false);
  const [flip2, setFlip2] = useState(false);
  const [atributo, setAtributo] = useState<Atributo>({ value: "" });

  const initMatch = async () => {
    const response = await api.post("play/init");
    setCard(response.data.cardUser);
    setCardPC(response.data.cardPC);
    setCountCard(response.data.countCardsUser);
    setCountCardPC(response.data.countCardsPC);
    if (response.data.playerTurn) {
      setCard(response.data.cardUser);
      setCardPC(response.data.cardPC);
      await delay(1);
      setFlip2(true);
      toast(<Toast message={text.labelPlayerTurn} />);
    } else {
      setFlip(false);
      setFlip2(false);
      await delay(1);
      setCard(response.data.cardUser);
      setCardPC(response.data.cardPC);
      toast(<Toast message={text.labelPCTurn} />);
    }
    console.log("init", response);
  };

  const play = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("play");
    const response = await api.post("play/play", {
      value: atributo.value,
    });
    if (response.data.isOver) {
      if (response.data.isWinner) {
        toast(<Toast message={text.labelWinner} />);
        delay(2);
        goToPage("/usuario");
      } else if (!response.data.isWinner) {
        toast(<Toast message={text.labelLoser} />);
        await delay(2);
        goToPage("/usuario");
      }
    }

    if (response.data.playerTurn) {
      if (!response.data.atributo_pc) {
        setFlip(true);
        setFlip2(true);
        toast(<Toast message={text.labelWinnerTurn} />);

        await delay(2);
        setFlip(false);
        setFlip2(false);
        await delay(2);
        setCard(response.data.cardUser);
        setCardPC(response.data.cardPC);
        await delay(2);
        setFlip2(true);
        toast(<Toast message={text.labelPlayerTurn} />);
      } else {
        setFlip(false);
        setFlip2(false);
        await delay(2);
        setFlip(true);
        console.log("atributo", response.data.atributo_pc);
        toast(
          <Toast
            message={`Foi escolhido o atributo ${response.data.atributo_pc}`}
          />
        );

        await delay(2);
        setFlip2(true);
        toast(<Toast message={text.labelWinnerTurn} />);
        await delay(2);
        setFlip(false);
        setFlip2(false);
        await delay(2);
        setCard(response.data.cardUser);
        setCardPC(response.data.cardPC);
        await delay(2);
        setFlip2(true);
        toast(<Toast message={text.labelPlayerTurn} />);
      }
    } else {
      if (!response.data.atributo_pc) {
        setFlip(true);

        await delay(2);
        toast(<Toast message={text.labelPCTurn} />);
        await delay(2);
        setFlip(false);
        setFlip2(false);
        await delay(2);
        setCard(response.data.cardUser);
        setCardPC(response.data.cardPC);

        setFlip(false);

        setFlip2(false);
        toast(<Toast message={text.labelPCTurn} />);
      } else {
        setFlip(false);
        setFlip2(false);
        await delay(2);
        setFlip(true);
        toast(
          <Toast
            message={`Foi escolhido o atributo ${response.data.atributo_pc}`}
          />
        );
        await delay(2);
        setFlip2(true);
        toast(<Toast message={text.labelPCTurn} />);
        await delay(2);
        setFlip(false);
        setFlip2(false);
        await delay(2);
        setCard(response.data.cardUser);
        setCardPC(response.data.cardPC);
      }
    }
    setAtributo({ value: "" });
    setCountCard(response.data.countCardsUser);
    setCountCardPC(response.data.countCardsPC);
  };
  useEffect(() => {
    initMatch();
  }, []);

  return (
    <>
      <Container
        type={"large"}
        content={
          <>
            {/* ///////////////////////////////////////////Oponente //////////////////////////////*/}
            <div className={"hidden sm:block  absolute top-0 left-0"}>
              <Card title={text.labelOponentCards} content={countCardPC} />
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
              <span className={"my-2 text-xl self-center"}>{countCardPC}</span>
            </div>
            {/* ///////////////////////////////////////////Cards //////////////////////////////*/}
            <div className={"h-full w-full flex justify-center items-center"}>
              <FlipedCard
                src={Logo}
                content={
                  <CartaContent
                    name={cardPC.name}
                    image={cardPC.image}
                    fofura={cardPC.fofura}
                    life_span={cardPC.life_span}
                    fome={cardPC.fome}
                    brincalhao={cardPC.brincalhao}
                    beleza={cardPC.beleza}
                    lineDisabled={true}
                  />
                }
                flip={flip}
              />

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
                    lineDisabled={false}
                    setAtributo={setAtributo}
                    isFlip={flip2}
                  />
                }
                flip={flip2}
              />
            </div>

            <div className={"hidden sm:block  absolute bottom-0 right-0"}>
              <Card
                title={text.labelMyCards}
                content={countCard}
                botton={
                  <Button
                    title={text.labelButtonNext}
                    onClick={async (e) => await play(e)}
                    // disabled={atributo.value ? false : true}
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
              <span className={"my-2 text-xl self-center"}>{countCard}</span>
              <Button
                title={text.labelButtonNext}
                className={"!m-0 !w-full"}
                onClick={async (e) => await play(e)}
                // disabled={atributo.value ? false : true}
              />
            </div>
          </>
        }
      />
    </>
  );
};

export default Game;
