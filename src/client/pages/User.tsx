import { useEffect, useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Text from "../components/Text";
import type { IUser } from "../../server/user/user.model";
import { api } from "../service/api/api";
import Card from "../components/Card";
import Button from "../components/Button";
import { initialUser, useGlobalStore } from "../service/useGlobalStore";
import { useNavigate } from "react-router-dom";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import toast from "react-simple-toasts";
import { Toast } from "../components/Toast";
import { AuthToken } from "../service/authToken";

const text = {
  labelTitle: "Player",
  labelUsername: "Username",
  labelPassword: "Senha",
  labelNome: "Nome",
  labelMatches: "Partidas Jogadas",
  labelMatchesWon: "Partidas Ganhas",
  labelScore: "Pontos",
  labelPlay: "Jogar",
  labelButtonAtualizar: "Atualizar",
  labelToastAtualizado: "Informações atualizadas",
};

const User = ({}) => {
  const navigate = useNavigate();
  const goToPage = (page: string) => {
    navigate(`${page}`);
  };
  const [disabled, setDisabled] = useState(true);
  const user = useGlobalStore((state) => state.user);

  const setUser = useGlobalStore((state) => state.setUser);
  const [userData, setUserData] = useState<IUser>({
    username: "",
    password: "",
    name: "",
    score: 0,
    matches: 0,
    matches_won: 0,
  });

  const editarForm = () => {
    setDisabled(!disabled);
  };

  const atualizaUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await api.patch("/users", {
      name: userData.name,
      password: userData.password,
    });
    console.log(response);
    if (response.data.success) {
      toast(<Toast message={text.labelToastAtualizado} />);
    }
    setDisabled(true);
  };
  const deletaUsuario = async () => {
    const response = await api.delete("/users");
    if (response) {
      setUser(initialUser);
      AuthToken.remove();
      goToPage("/login");
    }
  };
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
          <button className={`absolute top-3 right-6`}>
            {
              <FaPen
                className={"text-orange-700 h-10 w-5"}
                onClick={() => {
                  editarForm();
                }}
              />
            }
          </button>
          <button
            className={`absolute  top-2 left-6 ${disabled ? "hidden" : ""}`}
          >
            {
              <FaTrashAlt
                className={"text-red-700 h-10 w-5"}
                onClick={async () => {
                  await deletaUsuario();
                }}
              />
            }
          </button>

          <Text
            className={"text-center mt-6 text-4xl"}
            type={"h1"}
            text={text.labelTitle}
          />
          <div className={"mx-8 grid my-2 grid-cols-1"}>
            <Input
              label={text.labelNome}
              type={"text"}
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              disabled={disabled}
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
              disabled={disabled}
            />
          </div>
          <div className={`mx-10 text-center ${disabled ? "hidden" : ""}`}>
            <Button
              title={text.labelButtonAtualizar}
              className={"m-0 p-2 w-full md:right-12 md:bottom-6 md:w-60"}
              onClick={async (e) => await atualizaUsuario(e)}
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
                  onClick={() => goToPage("/game")}
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
