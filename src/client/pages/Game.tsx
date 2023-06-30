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
  labelPlayerTurnIdentifier: "Sua vez, escolha o atributo!",
  labelPCTurnIdentifier: "Você perdeu, aperte next!",
  labelPCTurn: "Você perdeu, aperte Next para a próxima rodada",
  labelWinnerTurn: "Você venceu o turno",
  labelDroped: "Partida excluida",
  labelDrop: "Drop",
  labelDesistir: "Desistir",
};

interface TurnIdentifier {
  isPlayerTurn: boolean;
}

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
  const [userTurn, setUserTurn] = useState(false);

  const initMatch = async () => {
    const response = await api.post("play/init");
    setCard(response.data.cardUser);
    setCardPC(response.data.cardPC);
    setCountCard(response.data.countCardsUser);
    setCountCardPC(response.data.countCardsPC);
    if (response.data.playerTurn) {
      setUserTurn(true);
      setCard(response.data.cardUser);
      setCardPC(response.data.cardPC);
      await delay(1);
      setFlip2(true);
      toast(<Toast message={text.labelPlayerTurn} />);
    } else {
      setUserTurn(false);
      setFlip(false);
      setFlip2(false);
      await delay(1);
      setCard(response.data.cardUser);
      setCardPC(response.data.cardPC);
      toast(<Toast message={text.labelPCTurn} />);
    }
    console.log("init", response);
  };

  const dropMatch = async () => {
    await api.post("play/drop");
    toast(<Toast message={text.labelDroped} />);
    goToPage("/usuario");
  };

  const play = async (e: React.FormEvent<HTMLFormElement>, atributo: any) => {
    e.preventDefault();
    const response = await api.post("play/play", {
      value: atributo,
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
      //se playerTurn for verdadeiro, significa que o player ganhou a rodada atual
      setUserTurn(true);
      if (!response.data.atributo_pc) {
        //se não tiver o atributo_pc, player ganhou a ultima rodada e a atual
        //(Lógica abaixo de como as cartas irão se comportar na situação: cartas são reveladas,
        //menssagem de vitória, cartas abaixam, são atualizadas com as próximas e é revelada a carta do jogador)
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
        //player perdeu a ultima rodada e ganhou a atual
        //(Lógica: carta do PC é revelada, mostra o atributo escolhido pelo pc, mostra mensagem de vitória
        //cartas abaixam, são atualizadas com as próximas e é revelada a carta do jogador)
        setFlip(false);
        setFlip2(false);
        await delay(1);
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
        await delay(3);
        setFlip(false);
        setFlip2(false);
        await delay(2);
        setCard(response.data.cardUser);
        setCardPC(response.data.cardPC);
        await delay(1);
        setFlip2(true);
        toast(<Toast message={text.labelPlayerTurn} />);
      }
    } else {
      // player perdeu a rodada atual
      setUserTurn(false);
      if (!response.data.atributo_pc) {
        //se não tiver o atributo_pc, player ganhou a ultima rodada e perdeu a atual
        //(Lógica: carta do PC é revelada, mostra mensagem de derrota
        //cartas abaixam, são atualizadas com as próximas)
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
        //player perdeu a ultima rodada e a atual
        //(Lógica: carta do PC é revelada, mostra o atributo escolhido pelo pc, mostra mensagem de derrota
        //cartas abaixam, são atualizadas com as próximas )
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
        await delay(3);
        setFlip(false);
        setFlip2(false);
        await delay(2);
        setCard(response.data.cardUser);
        setCardPC(response.data.cardPC);
      }
    }
    setCountCard(response.data.countCardsUser);
    setCountCardPC(response.data.countCardsPC);
  };

  const alertUserTurn = () => {
    toast(<Toast message={text.labelPlayerTurn} />);
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
            <TurnIdentifier isPlayerTurn={userTurn} />
            {/* ///////////////////////////////////////////Oponente //////////////////////////////*/}
            <div className={"hidden sm:block  absolute top-0 left-0"}>
              <Card title={text.labelOponentCards} content={countCardPC} />
            </div>
            <div
              className={
                "grid grid-cols-3  gap-4 text-center sm:hidden  absolute top-0 w-full bg-orange-500 border border-orange-700 rounded-xl"
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
              <Button
                title={text.labelDesistir}
                className={"!m-0 !w-full"}
                onClick={async () => await dropMatch()}
              />
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
                    isFlip={flip2}
                    playFofura={async (e: React.FormEvent<HTMLFormElement>) =>
                      await play(e, "fofura")
                    }
                    playLifeSpan={async (e: React.FormEvent<HTMLFormElement>) =>
                      await play(e, "life_span")
                    }
                    playLifeFome={async (e: React.FormEvent<HTMLFormElement>) =>
                      await play(e, "fome")
                    }
                    playBrincalhao={async (
                      e: React.FormEvent<HTMLFormElement>
                    ) => await play(e, "brincalhao")}
                    playBeleza={async (e: React.FormEvent<HTMLFormElement>) =>
                      await play(e, "beleza")
                    }
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
                    onClick={
                      userTurn
                        ? () => alertUserTurn()
                        : async (e) => await play(e, "")
                    }
                  />
                }
              />
            </div>
            <div className={"hidden sm:block  absolute top-0 right-0"}>
              <Card
                title={text.labelDesistir}
                content={""}
                botton={
                  <Button
                    title={text.labelDrop}
                    onClick={async () => await dropMatch()}
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
                onClick={
                  userTurn
                    ? () => alertUserTurn()
                    : async (e) => await play(e, "")
                }
                // disabled={atributo.value ? false : true}
              />
            </div>
          </>
        }
      />
    </>
  );
};

const TurnIdentifier = ({ isPlayerTurn }: TurnIdentifier) => {
  return isPlayerTurn ? (
    <div className={"flex justify-center"}>
      <div className="border border-green-700 bg-green-500 rounded-xl py-2 px-4 text-2xl text-black w-[calc(300px)] absolute top-16 text-center">
        {text.labelPlayerTurnIdentifier}
      </div>
    </div>
  ) : (
    <div className={"flex justify-center"}>
      <div className="border border-orange-700 bg-orange-500 rounded-xl py-2 px-4 text-2xl text-black w-[calc(300px)] absolute top-16 text-center">
        {text.labelPCTurnIdentifier}
      </div>
    </div>
  );
};

export default Game;
