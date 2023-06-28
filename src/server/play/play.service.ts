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

  private arrumaBaralho(
    vencedor: ICards[],
    perdedor: ICards[],
    cartaVencedor: ICards,
    cartaPerdedor: ICards
  ) {
    perdedor.shift();
    vencedor.push(cartaPerdedor);
    vencedor.shift();
    vencedor.push(cartaVencedor);
  }

  private updateMatch = async (
    username: string,
    match: IPlay,
    cardsPC: ICards[],
    cardsUser: ICards[],
    turn: number,
    playerTurn: boolean
  ) => {
    const updated_match = await this.playRepository.update(username, {
      ...match,
      cardsPC: cardsPC,
      cardsUser: cardsUser,
      turns: turn,
      playerTurn: playerTurn,
    });
    if (updated_match) {
      return {
        username: updated_match.username,
        cardUser: updated_match.cardsUser[0],
        cardPC: updated_match.cardsPC[0],
        countCardsUser: updated_match.cardsUser.length,
        countCardsPC: updated_match.cardsPC.length,
        playerTurn: updated_match.playerTurn,
        turns: updated_match.turns,
        isOver: false,
      };
    }
    return "oba";
  };

  private playerWonTurn = async (
    username: string,
    turn: number,
    user: IUser,
    cardsPC: ICards[],
    cardsUser: ICards[],
    cardPC: ICards,
    cardUser: ICards,
    match: IPlay
  ) => {
    if (cardsPC.length === 1) {
      //Como o player ganhou, o PC perdeu sua ultima carta
      /// player ganhou
      const matchScore = this.turnsScore(turn);
      await this.userService.update(username, {
        ...user,
        score: user.score + matchScore,
        matches_won: user.matches_won + 1,
      });
      const deleted_match = await this.playRepository.delete(username);

      return {
        ...deleted_match,
        isOver: true,
      };
    } else {
      this.arrumaBaralho(cardsUser, cardsPC, cardUser, cardPC);
      return await this.updateMatch(
        username,
        match,
        cardsPC,
        cardsUser,
        turn,
        true
      );
      // console.log("responseinside", response);
      // return response;
      // const updated_match = await this.playRepository.update(username, {
      //   ...match,
      //   cardsPC: cardsPC,
      //   cardsUser: cardsUser,
      //   turns: turn,
      //   playerTurn: true,
      // });
      // if (updated_match) {
      //   return {
      //     username: updated_match.username,
      //     cardUser: updated_match.cardsUser[0],
      //     cardPC: updated_match.cardsPC[0],
      //     countCardsUser: updated_match.cardsUser.length,
      //     countCardsPC: updated_match.cardsPC.length,
      //     playerTurn: updated_match.playerTurn,
      //     turns: updated_match.turns,
      //     isOver: false,
      //   };
      // }
    }
  };

  private computerWonTurn = async (
    username: string,
    turn: number,
    cardsPC: ICards[],
    cardsUser: ICards[],
    cardPC: ICards,
    cardUser: ICards,
    match: IPlay
  ) => {
    if (cardsUser.length === 1) {
      /// computador ganhou

      const deleted_match = await this.playRepository.delete(username);
      return {
        ...deleted_match,
        isOver: true,
      };
    } else {
      //Computador ganhou a carta
      this.arrumaBaralho(cardsPC, cardsUser, cardPC, cardUser);
      return await this.updateMatch(
        username,
        match,
        cardsPC,
        cardsUser,
        turn,
        false
      );
      // const updated_match = await this.playRepository.update(username, {
      //   ...match,
      //   cardsPC: cardsPC,
      //   cardsUser: cardsUser,
      //   turns: turn,
      //   playerTurn: false,
      // });

      // if (updated_match) {
      //   return {
      //     username: updated_match.username,
      //     cardUser: updated_match.cardsUser[0],
      //     cardPC: updated_match.cardsPC[0],
      //     countCardsUser: updated_match.cardsUser.length,
      //     countCardsPC: updated_match.cardsPC.length,
      //     playerTurn: updated_match.playerTurn,
      //     turns: updated_match.turns,
      //     isOver: false,
      //   };
      // }
    }
  };

  async jogada(user: IUser, atributo: { value: string }) {
    const username = user.username;
    const match = await this.playRepository.findMatch(username);
    if (match) {
      const cardPC = match.cardsPC[0];
      const cardUser = match.cardsUser[0];
      const cardsPC = match.cardsPC;
      const cardsUser = match.cardsUser;
      const turn = match.turns + 1;
      if (match.playerTurn && atributo) {
        type KeyCards = keyof ICards;
        const keys = Object.keys(cardUser);

        for (const key of keys) {
          if (key == atributo.value) {
            if (cardUser[key as KeyCards] >= cardPC[key as KeyCards]) {
              return await this.playerWonTurn(
                username,
                turn,
                user,
                cardsPC,
                cardsUser,
                cardPC,
                cardUser,
                match
              );
            } else {
              //Computador ganhou o turno
              return await this.computerWonTurn(
                username,
                turn,
                cardsPC,
                cardsUser,
                cardPC,
                cardUser,
                match
              );
            }
          }
        }
        // Object.keys(cardUser).map(async (key) => {
        //   if (key == atributo.value) {
        //     if (cardUser[key as KeyCards] >= cardPC[key as KeyCards]) {
        //       response = await this.playerWonTurn(
        //         username,
        //         turn,
        //         user,
        //         cardsPC,
        //         cardsUser,
        //         cardPC,
        //         cardUser,
        //         match
        //       );
        //     } else {
        //       //Computador ganhou o turno
        //       response = await this.computerWonTurn(
        //         username,
        //         turn,
        //         cardsPC,
        //         cardsUser,
        //         cardPC,
        //         cardUser,
        //         match
        //       );
        //     }
        //   }
        // });
      } else if (!match.playerTurn) {
      }
    }
    return false;
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
