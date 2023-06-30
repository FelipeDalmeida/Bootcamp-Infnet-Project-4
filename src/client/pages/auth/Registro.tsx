import Input from "../../components/Input";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { useState } from "react";
import Img from "../../components/Img";
import Logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { AuthToken } from "../../service/authToken";
import { useGlobalStore } from "../../service/useGlobalStore";
import Container from "../../components/Container";
import { api } from "../../service/api/api";

const text = {
  labelUsermae: "Username",
  labelPassword: "Senha",
  labelName: "Nome",
  labelConfirmPassword: "Confirme a senha",
  labelTitle: "Registro",
  labelButton: "Registrar",
  labelButtonLogin: "Ir para Login",
  labelBadPassword: "Senhas não coincidem",
};

const Register = () => {
  const navigate = useNavigate();
  const goToPage = (page: string) => {
    navigate(`${page}`);
  };
  const setUser = useGlobalStore((state) => state.setUser);
  const [registro, setRegistro] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    senhaError: "",
  });

  const registar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegistro({ ...registro, senhaError: "" });
    if (registro.password === registro.confirmPassword) {
      const response = await api.post("/auth/register", {
        name: registro.name,
        password: registro.password,
        username: registro.username,
      });
      if (response.data.user.success) {
        AuthToken.set(response.data.token);
        setUser({ ...response.data.user.data, isAuthenticated: true });
      }

      goToPage("/usuario");
    } else {
      setRegistro({ ...registro, senhaError: text.labelBadPassword });
    }

    // if (registro.email === registro.confirmEmail) {

    //     setRegistro({ ...registro, emailError: "" })

    //     const response = await register({
    //         nome: registro.nome,
    //         email: registro.email,
    //         password: registro.password
    //     })

    //     if (response.success && response.accessToken) {
    //         const { accessToken, user } = response;
    //         AuthToken.set(accessToken)
    //         setUser({ ...user, isAuthenticated: true });
    //         goToPage("/cadastro")

    //     } else {
    //         setRegistro({ ...registro, error: "Erro no registro" })
    //     }
    // } else {
    //     setRegistro({ ...registro, emailError: "E-mail diferente!" })
    //}
  };

  return (
    <Container
      type={"auth"}
      content={
        <>
          <div className={"h-40 flex justify-center"}>
            <Img img={Logo} />
          </div>
          <Text
            className={"text-center mt-6 text-4xl"}
            type={"h1"}
            text={text.labelTitle}
          />
          <div className={"mx-8 grid my-2 grid-cols-1"}>
            <Input
              label={text.labelName}
              type={"text"}
              value={registro.name}
              onChange={(e) =>
                setRegistro({ ...registro, name: e.target.value })
              }
            />

            <Input
              label={text.labelUsermae}
              type={"text"}
              value={registro.username}
              onChange={(e) =>
                setRegistro({ ...registro, username: e.target.value })
              }
            />

            <Input
              label={text.labelPassword}
              type={"password"}
              value={registro.password}
              onChange={(e) =>
                setRegistro({ ...registro, password: e.target.value })
              }
            />

            <Input
              label={text.labelConfirmPassword}
              type={"password"}
              value={registro.confirmPassword}
              onChange={(e) =>
                setRegistro({ ...registro, confirmPassword: e.target.value })
              }
              error={registro.senhaError}
            />
          </div>
          <div className={"mx-10 "}>
            <Button
              type={"submit"}
              title={text.labelButton}
              className={"m-0 my-3 p-2 w-full "}
              onClick={registar}
            />
            <Button
              type={"button"}
              title={text.labelButtonLogin}
              className={"m-0 my-3 p-2 w-full "}
              onClick={() => {
                goToPage("/");
              }}
            />
          </div>
        </>
      }
    />
  );
};

export default Register;
