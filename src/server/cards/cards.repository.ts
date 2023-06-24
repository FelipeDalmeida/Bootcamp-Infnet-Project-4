import { Service } from "typedi";
import { Cards } from "./cards.model";
import { CreateCardDto } from "./dto/create-card.dto";
@Service()
export class CardsRepository {
  constructor() {}

  async findAll() {
    const cards = await Cards.find().lean();
    return cards;
  }

  async findOne(name: string) {
    const card = await Cards.findOne({ name }).lean();
    return card;
  }

  async create(createcarddto: CreateCardDto) {
    const user = (await Cards.create(createcarddto)).toJSON();
    return user;
  }

  async createMultiple(createcardsdto: CreateCardDto[]) {
    let cards = [];
    for (let createcarddto of createcardsdto) {
      const card = (await Cards.create(createcarddto)).toJSON();
      cards.push(card);
    }
    return cards;
  }

  //   async update(username: string, updateuserdto: UpdateUserDto) {
  //     const user = await Cards.findOneAndUpdate(
  //       { username },
  //       updateuserdto
  //     ).lean();
  //     return user;
  //   }

  //   async delete(username: string) {
  //     const user = await Cards.findOneAndDelete({ username }).lean();
  //     return user;
  //   }
}
