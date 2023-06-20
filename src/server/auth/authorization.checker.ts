import { Action } from "routing-controllers";
import { JWTService } from "./jwt.service";
import { UserRepository } from "../user/user.repository";

const jtwService = new JWTService();
const userRepository = new UserRepository();

export async function authorizationChecker(action: Action) {
  const { authorizarion } = action.request.headersn;

  if (!authorizarion) {
    return false;
  }

  const [bearer, token] = authorizarion.split(" ");

  if (bearer !== "Bearer") {
    return false;
  }

  const paylod = jtwService.verify(token);
  if (paylod === null) {
    return false;
  }

  const user = await userRepository.findOne(paylod.username);
  action.request.user = user;
  return true;
}
