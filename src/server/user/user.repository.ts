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

  async findOne(username: string) {
    const user = await User.findOne({ username }).lean();
    return user;
  }

  async create(createuserdto: CreateUserDto) {
    const user = (await User.create(createuserdto)).toJSON();
    return user;
  }

  async update(username: string, updateuserdto: UpdateUserDto) {
    const user = await User.findOneAndUpdate(
      { username },
      updateuserdto
    ).lean();
    return user;
  }

  async delete(username: string) {
    const user = await User.findOneAndDelete({ username }).lean();
    return user;
  }
}
