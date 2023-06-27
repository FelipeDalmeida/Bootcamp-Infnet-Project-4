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
      };
    }

    let cards: ICards[] | undefined = (await this.cardsService.getAll()).data;
    if (cards) {
      cards = this.shuffle(cards);
      const match = await this.playRepository.create({
        username: username,
        cardsUser: cards.slice(0, 15),
        cardsPC: cards.slice(15, 30),
        playerTurn: true,
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
