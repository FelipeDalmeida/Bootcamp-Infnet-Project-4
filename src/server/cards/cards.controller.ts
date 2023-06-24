import {
  JsonController,
  Get,
  Post,
  Body,
  Param,
  Authorized,
} from "routing-controllers";
import { Service } from "typedi";
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";

@Service()
@JsonController("/cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Authorized()
  @Get()
  async getAll() {
    const cards = await this.cardsService.getAll();
    return cards;
  }

  @Authorized()
  @Get("/:name")
  async getOne(@Param("name") name: string) {
    const card = await this.cardsService.findOne(name);
    return card;
  }

  @Authorized()
  @Post()
  async create(@Body() createcarddto: CreateCardDto) {
    const card = await this.cardsService.create(createcarddto);
    return card;
  }

  @Authorized()
  @Post("/multiple")
  async createMultiple(@Body() createcardsdto: CreateCardDto[]) {
    const card = await this.cardsService.createMultiple(createcardsdto);
    return card;
  }
}
