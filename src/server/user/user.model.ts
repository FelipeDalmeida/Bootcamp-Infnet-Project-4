import { connect, Schema, model } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  password: string;
  score: number;
  matches: number;
}

const userSchema = new Schema<IUser>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: Schema.Types.String,
    required: true,
    minlength: 4,
    maxlength: 128,
  },
  score: {
    type: Schema.Types.Number,
    required: true,
    min: 0,
  },
  matches: {
    type: Schema.Types.Number,
    required: true,
    min: 0,
  },
});

export const User = model<IUser>("User", userSchema);
