import { Schema, model } from "mongoose";
import { IUser } from "../user/user.model";
import { ICards } from "../cards/cards.model";

export interface IPlay {
  username: string;
  cardsUser: ICards[];
  cardsPC: ICards[];
  playerTurn: boolean;
  turns: number;
}

export const playSchema = new Schema<IPlay>({
  username: {
    type: Schema.Types.String,
    required: true,
  },
  cardsUser: {
    type: Schema.Types.Mixed,
    required: true,
    ref: "Card",
  },
  cardsPC: {
    type: Schema.Types.Mixed,
    ref: "Card",
    required: true,
  },
  playerTurn: {
    type: Schema.Types.Boolean,
    default: true,
  },
  turns: {
    type: Schema.Types.Number,
    default: 0,
    required: true,
  },
});

export const Play = model<IPlay>("Play", playSchema);
