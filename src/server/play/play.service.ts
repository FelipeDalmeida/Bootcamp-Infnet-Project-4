import { Service } from "typedi";
import { UserService } from "../user/user.service";
import type { IUser } from "../user/user.model";
import { IPlay } from "./play.model";
import { ICards } from "../cards/cards.model";
import { CardsService } from "../cards/cards.service";
import { PlayRepository } from "./play.respository";

@Service()
export class PlayService {
  constructor(
    private readonly playRepository: PlayRepository,
    private readonly userService: UserService,
    private readonly cardsService: CardsService
  ) {}

  private shuffle(array: any) {
    let newArray: ICards[] = [];
    Object.keys(array).map((key) => {
      newArray.push(array[key]);
    });
    var m = newArray.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = newArray[m];
      newArray[m] = newArray[i];
      newArray[i] = t;
    }
    return newArray;
  }

  private turnsScore(turns: number) {
    if (turns === 15) {
      return 25;
    } else if (turns === 30) {
      return 15;
    } else {
      return 10;
    }
  }

  async jogada(user: IUser, atributo: { value: string }) {
    const username = user.username;
    let response;
    const match = await this.playRepository.findMatch(username);
    if (match) {
      console.log("atributo", atributo);
      const cardPC = match.cardsPC[0];
      const cardUser = match.cardsUser[0];
      const cardsPC = match.cardsPC;
      const cardsUser = match.cardsUser;
      const turn = match.turns + 1;
      if (match.playerTurn && atributo) {
        console.log("entrou");
        type KeyCards = keyof ICards;
        response = Object.keys(cardUser).map(async (key) => {
          if (key == atributo.value) {
            console.log("entrou2", key);
            if (cardUser[key as KeyCards] >= cardPC[key as KeyCards]) {
              if (cardsPC.length === 0) {
                /// player ganhou
                const matchScore = this.turnsScore(turn);
                await this.userService.update(username, {
                  ...user,
                  score: user.score + matchScore,
                });
                const deleted_match = await this.playRepository.delete(
                  username
                );

                return {
                  ...deleted_match,
                  isOver: true,
                };
              } else {
                //Player ganhou a carta
                cardsPC.shift();
                cardsUser.push(cardPC);
                cardsUser.shift();
                cardsUser.push(cardUser);
                const updated_match = await this.playRepository.update(
                  username,
                  {
                    ...match,
                    cardsPC: cardsPC,
                    cardsUser: cardsUser,
                    turns: turn,
                  }
                );
                if (updated_match) {
                  return {
                    username: updated_match.username,
                    cardUser: updated_match.cardsUser[0],
                    cardPC: updated_match.cardsPC[0],
                    countCardsUser: updated_match.cardsUser.length,
                    countCardsPC: updated_match.cardsPC.length,
                    playerTurn: updated_match.playerTurn,
                    turns: updated_match.turns,
                  };
                }
              }
            }
          }
        });
      }
    }
    return response;
  }

  async initMatch(user: IUser) {
    const username = user.username;
    const unfinishedMatch = await this.playRepository.findMatch(username);

    if (unfinishedMatch) {
      return {
        username: unfinishedMatch.username,
        cardUser: unfinishedMatch.cardsUser[0],
        cardPC: unfinishedMatch.cardsPC[0],
        countCardsUser: unfinishedMatch.cardsUser.length,
        countCardsPC: unfinishedMatch.cardsPC.length,
        playerTurn: unfinishedMatch.playerTurn,
        turns: unfinishedMatch.turns,
      };
    } else {
      let cards: ICards[] | undefined = (await this.cardsService.getAll()).data;
      if (cards) {
        const userMatches = user.matches + 1;
        await this.userService.update(username, {
          ...user,
          matches: userMatches,
        });
        cards = this.shuffle(cards);
        const match = await this.playRepository.create({
          username: username,
          cardsUser: cards.slice(0, 15),
          cardsPC: cards.slice(15, 30),
          playerTurn: true,
          turns: 0,
        });

        return {
          username: match.username,
          cardUser: match.cardsUser[0],
          cardPC: match.cardsPC[0],
          countCardsUser: match.cardsUser.length,
          countCardsPC: match.cardsPC.length,
          playerTurn: match.playerTurn,
        };
      } else {
        return false;
      }
    }
  }
}
