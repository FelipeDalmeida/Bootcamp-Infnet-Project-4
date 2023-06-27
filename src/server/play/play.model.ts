import { Schema, model } from "mongoose";
import { IUser } from "../user/user.model";
import { ICards } from "../cards/cards.model";

export interface IPlay {
  username: string;
  cardsUser: ICards[];
  cardsPC: ICards[];
  playerTurn: boolean;
}

export const playSchema = new Schema<IPlay>({
  username: {
    type: Schema.Types.String,
    required: true,
  },
  cardsUser: {
    type: Schema.Types.Mixed,
    ref: "Card",
  },
  cardsPC: {
    type: Schema.Types.Mixed,
    ref: "Card",
  },
  playerTurn: {
    type: Schema.Types.Boolean,
    default: true,
  },
});

export const Play = model<IPlay>("Play", playSchema);
