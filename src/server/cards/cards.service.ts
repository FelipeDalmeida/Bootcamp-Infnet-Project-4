import { Service } from "typedi";
import { CardsRepository } from "./cards.repository";
import { CreateCardDto } from "./dto/create-card.dto";

@Service()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  async getAll() {
    const cards = await this.cardsRepository.findAll();
    if (cards) {
      return {
        success: true,
        data: {
          ...cards, //@TODO:Enviar apenas as informações necessárias
        },
      };
    } else {
      return {
        success: false,
      };
    }
  }

  async findOne(name: string) {
    const card = await this.cardsRepository.findOne(name);
    if (card) {
      return {
        success: true,
        data: {
          ...card,
        },
      };
    } else {
      return {
        success: false,
      };
    }
  }

  async create(createcarddto: CreateCardDto) {
    const card = await this.cardsRepository.create(createcarddto);
    if (card) {
      return {
        success: true,
        data: {
          ...card,
        },
      };
    } else {
      return {
        success: false,
      };
    }
  }

  async createMultiple(createcarsddto: CreateCardDto[]) {
    const cards = await this.cardsRepository.createMultiple(createcarsddto);
    if (cards.length > 0) {
      return {
        success: true,
        data: {
          ...cards,
        },
      };
    } else {
      return {
        success: false,
      };
    }
  }
}
