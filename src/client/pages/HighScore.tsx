import { useEffect, useState } from "react";
import { api } from "../service/api/api";
import type { IUser } from "../../server/user/user.model";
import Container from "../components/Container";

const HighScore = ({}) => {
  const [highScores, setHighscores] = useState<IUser[]>([]);
  const loadHoghScore = async () => {
    const response = await api.get("users/highscores");
    console.log(response);
    if (response.data.success) {
      let highscores: IUser[] = [];
      Object.keys(response.data.data).map((key) => {
        highscores.push(response.data.data[key]);
      });
      setHighscores(highscores);
    }
  };
  useEffect(() => {
    loadHoghScore();
  }, []);

  return (
    <Container
      className={"!p-0"}
      content={
        <div
          className={
            "mx-8 grid my-2 grid-cols-4 justify-items-center text-xl overflow-auto h-[calc(100vh-215px)]"
          }
        >
          <div>{"Posição"}</div>
          <div>{"Username"}</div>
          <div>{"Partidas"}</div>
          <div>{"Pontos"}</div>
          <div>{"🏁"}</div>
          <div>{"😃"}</div>
          <div>{"🎺"}</div>
          <div>{"🏆"}</div>

          {highScores.map((HighScore, index) => {
            return (
              <>
                <div className={"!text-xl text-orange-700"}>{index + 1}</div>
                <div className={"!text-xl text-orange-700"}>
                  {HighScore.username}
                </div>
                <div className={"!text-xl text-orange-700"}>
                  {HighScore.matches}
                </div>
                <div className={"!text-xl text-orange-700"}>
                  {HighScore.score}
                </div>
              </>
            );
          })}
        </div>
      }
    />
  );
};

export default HighScore;
