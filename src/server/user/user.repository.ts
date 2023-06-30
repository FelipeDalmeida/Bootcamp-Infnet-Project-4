import { Service } from "typedi";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.model";

@Service()
export class UserRepository {
  constructor() {}

  async findAll() {
    const users = await User.find().lean();
    return users;
  }

  async findHighscores() {
    const highscores = await User.find().sort({ score: "desc" }).lean();
    return highscores;
  }

  async findOne(username: string) {
    const user = await User.findOne({ username }).lean();
    return user;
  }

  async create(createuserdto: CreateUserDto) {
    const user = (await User.create(createuserdto)).toJSON();
    return user;
  }

  async update(username: string, updateuserdto: UpdateUserDto) {
    console.log(updateuserdto);
    const user = await User.findOneAndUpdate({ username }, updateuserdto, {
      new: true,
    }).lean();
    return user;
  }

  async delete(username: string) {
    const user = await User.findOneAndDelete(
      { username },
      {
        new: true,
      }
    ).lean();
    return user;
  }
}
