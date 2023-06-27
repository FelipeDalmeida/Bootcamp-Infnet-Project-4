import { Service } from "typedi";
import { IPlay, Play } from "./play.model";
@Service()
export class PlayRepository {
  constructor() {}

  async findMatch(username: string) {
    const match = await Play.findOne({ username }).lean();
    return match;
  }

  async create(createMatch: IPlay) {
    const match = (await Play.create(createMatch)).toJSON();
    return match;
  }

  //   async findOne(name: string) {
  //     const card = await Cards.findOne({ name }).lean();
  //     return card;
  //   }

  //   async create(createcarddto: CreateCardDto) {
  //     const user = (await Cards.create(createcarddto)).toJSON();
  //     return user;
  //   }

  //   async createMultiple(createcardsdto: CreateCardDto[]) {
  //     let cards = [];
  //     for (let createcarddto of createcardsdto) {
  //       const card = (await Cards.create(createcarddto)).toJSON();
  //       cards.push(card);
  //     }
  //     return cards;
  //   }
}
