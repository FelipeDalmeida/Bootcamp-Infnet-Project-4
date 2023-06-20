import { Action } from "routing-controllers";
import { JWTService } from "./jwt.service";
import { UserRepository } from "../user/user.repository";

const jtwService = new JWTService();
const userRepository = new UserRepository();

export async function currentUserChecker(action: Action) {
  return action.request.user;
}
