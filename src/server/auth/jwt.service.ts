import { Service } from "typedi";
import JWT from "jsonwebtoken";

@Service()
export class JWTService {
  sign(payload: JWT.JwtPayload) {
    const secret = process.env.JWT_SECRET ?? "";
    const token = JWT.sign(payload, secret);
    return token;
  }

  verify(token: string) {
    try {
      const secret = process.env.JWT_SECRET ?? "";
      const payload = JWT.verify(token, secret) as JWT.JwtPayload;
      return payload;
    } catch (error) {
      return null;
    }
  }
}
