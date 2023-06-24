import { Schema, model } from "mongoose";

export interface ICards {
  name: string;
  image: string;
  fofura: number;
  life_span: number;
  fome: number;
  brincalhao: number;
  beleza: number;
}

export const cardsSchema = new Schema<ICards>({
  name: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 26,
  },
  image: {
    type: Schema.Types.String,
    required: true,
    minlength: 2,
  },
  fofura: {
    type: Schema.Types.Number,
    required: true,
    max: 100,
  },
  life_span: {
    type: Schema.Types.Number,
    required: true,
    min: 0,
  },
  fome: {
    type: Schema.Types.Number,
    required: true,
    min: 1,
    max: 100,
  },
  brincalhao: {
    type: Schema.Types.Number,
    required: true,
    min: 0,

    max: 100,
  },
  beleza: {
    type: Schema.Types.Number,
    required: true,
    min: 1,
    max: 100,
  },
});

export const Cards = model<ICards>("Card", cardsSchema);
