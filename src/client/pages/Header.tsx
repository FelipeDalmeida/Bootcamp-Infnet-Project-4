import Nav from "../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useGlobalStore } from "../service/useGlobalStore";
import { AuthToken } from "../service/authToken";
import { initialUser } from "../service/useGlobalStore";
const text = {
  register: "Criar Conta",
  logout: "Logout",
  play: "Jogar",
  highscore: "Highscore",
  myself: "Minha conta",
};

const Header = () => {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const navigate = useNavigate();
  const goToPage = (page: string) => {
    navigate(page);
  };

  const logOut = () => {
    AuthToken.remove();
    setUser(initialUser);
    goToPage("/login");
  };

  const anchor =
    user.isAuthenticated && AuthToken.get()
      ? [
          <Link to="/" className={" text-2xl hover:text-orange-700"}>
            {text.play}
          </Link>,
          <Link to="/" className={" text-2xl hover:text-orange-700"}>
            {text.highscore}
          </Link>,
          <Link to="/usuario" className={" text-2xl hover:text-orange-700"}>
            {text.myself}
          </Link>,
        ]
      : "";

  const anchor2 = [
    user.isAuthenticated ? (
      <Button
        className={"mt-6 md:mt-1"}
        title={text.logout}
        onClick={() => {
          logOut();
        }}
      />
    ) : (
      <Button
        className={"mt-6 md:mt-1"}
        title={text.register}
        onClick={() => goToPage("/register")}
      />
    ),
  ];

  return (
    <>
      <Nav anchor={anchor} anchor2={anchor2} />
    </>
  );
};

export default Header;
