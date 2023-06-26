import { useEffect, useState } from "react";
import { ICards } from "../../server/cards/cards.model";
import Container from "../components/Container";
import Text from "../components/Text";
import { api } from "../service/api/api";
import Carta from "../components/Carta";
import Modal from "../components/Modal";

const text = {
  labelTitle: "Cartas",
  labelUsername: "Username",
  labelPassword: "Senha",
  labelNome: "Nome",
  labelMatches: "Partidas Jogadas",
  labelMatchesWon: "Partidas Ganhas",
  labelScore: "Pontos",
  labelPlay: "Jogar",
};

const Cartas = ({}) => {
  const [cards, setCards] = useState<ICards[]>([]);

  const carregaCards = async () => {
    const response = await api.get("/cards");
    let cartas: ICards[] = [];
    Object.keys(response.data.data).map((key) => {
      cartas.push(response.data.data[key]);
    });
    setCards(cartas);
  };
  useEffect(() => {
    carregaCards();
  }, []);
  return (
    <Container
      type={"small"}
      content={
        <>
          <Text
            className={"text-center mt-6 text-4xl"}
            type={"h1"}
            text={text.labelTitle}
          />

          <div className={"mx-8 grid my-2 grid-cols-1"}>
            {cards.map((card) => {
              return (
                <Carta
                  name={card.name}
                  image={card.image}
                  fofura={card.fofura}
                  life_span={card.life_span}
                  fome={card.fome}
                  brincalhao={card.brincalhao}
                  beleza={card.beleza}
                />
              );
            })}
          </div>
        </>
      }
    />
  );
};

export default Cartas;
