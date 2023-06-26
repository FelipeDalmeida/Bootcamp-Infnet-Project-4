import { useEffect, useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Text from "../components/Text";
import type { IUser } from "../../server/user/user.model";
import { api } from "../service/api/api";
import Card from "../components/Card";
import Button from "../components/Button";
import { useGlobalStore } from "../service/useGlobalStore";

const text = {
  labelTitle: "Player",
  labelUsername: "Username",
  labelPassword: "Senha",
  labelNome: "Nome",
  labelMatches: "Partidas Jogadas",
  labelMatchesWon: "Partidas Ganhas",
  labelScore: "Pontos",
  labelPlay: "Jogar",
};

const User = ({}) => {
  const user = useGlobalStore((state) => state.user);
  const [userData, setUserData] = useState<IUser>({
    username: "",
    password: "",
    name: "",
    score: 0,
    matches: 0,
    matches_won: 0,
  });

  const carregaUser = async () => {
    const response = await api.get("/users/auth/myself");
    console.log("myself", response);
    setUserData({ ...response.data });
  };

  useEffect(() => {
    carregaUser();
    console.log(user);
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
            <Input
              label={text.labelNome}
              type={"text"}
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              disabled={true}
            />
            <Input
              label={text.labelUsername}
              type={"text"}
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              disabled={true}
            />
            <Input
              label={text.labelPassword}
              type={"password"}
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              disabled={true}
            />
          </div>
          <div
            className={
              "mx-8 grid my-2 grid-cols-1 md:grid-cols-2 xxl:grid-cols-3"
            }
          >
            <Card
              title={text.labelPlay}
              content={
                <Button
                  className={"!text-black p-3 !w-24"}
                  title={"🎾"}
                  onClick={() => {}}
                />
              }
            />
            <Card
              title={text.labelMatches}
              content={"🎺"}
              botton={`${userData.matches}`}
            />
            <Card
              title={text.labelMatchesWon}
              content={"😎"}
              botton={`${userData.matches_won}`}
            />
            <Card
              title={text.labelScore}
              content={"🏆"}
              botton={`${userData.score}`}
            />
          </div>
        </>
      }
    />
  );
};

export default User;
