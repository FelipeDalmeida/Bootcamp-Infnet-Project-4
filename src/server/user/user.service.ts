import { Service } from "typedi";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./user.repository";

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    const users = await this.userRepository.findAll();
    if (users) {
      return {
        success: true,
        data: {
          ...users, //@TODO:Enviar apenas as informações necessárias
        },
      };
    } else {
      return {
        success: false,
      };
    }
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne(username);
    if (user) {
      return {
        success: true,
        data: {
          ...user,
        },
      };
    } else {
      return {
        success: false,
      };
    }
  }

  async create(createuserdto: CreateUserDto) {
    createuserdto.score = 0;
    createuserdto.matches = 0;
    createuserdto.matches_won = 0;
    const user = await this.userRepository.create(createuserdto);
    if (user) {
      return {
        success: true,
        data: {
          ...user,
        },
      };
    } else {
      return {
        success: false,
      };
    }
  }

  async update(username: string, updateuserdto: UpdateUserDto) {
    const user = await this.userRepository.update(username, updateuserdto);
    if (user) {
      return {
        success: true,
        data: {
          ...user,
        },
      };
    } else {
      return {
        success: false,
      };
    }
  }

  async delete(username: string) {
    const user = await this.userRepository.delete(username);
    if (user) {
      return {
        success: true,
        data: {
          ...user,
        },
      };
    } else {
      return {
        success: false,
      };
    }
  }
}
