import { JsonController, Get } from "routing-controllers";
import { connect, Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
});

const User = model<IUser>("User", userSchema);

@JsonController("/users")
export class UserController {
  @Get()
  async getAll() {
    await connect(process.env.DATABASE_URL ?? "");
    await User.insertMany([
      { name: "Felipe", email: "felipe_dalmeida@hotmail.com" },
    ]);
    const user = await User.find();

    return user;
  }
}
