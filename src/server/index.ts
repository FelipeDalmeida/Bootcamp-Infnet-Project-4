import "reflect-metadata";
import * as dotenv from "dotenv";
import { Container } from "typedi";
import { createExpressServer, useContainer } from "routing-controllers";
import { UserController } from "./user/user.controller";
import { connect } from "mongoose";
import { AuthController } from "./auth/auth.controller";
dotenv.config();

useContainer(Container);

createExpressServer({
  controllers: [UserController, AuthController],
  cors: true,
}).listen(process.env.PORT, process.env.HOST, async () => {
  await connect(process.env.DATABASE_URL ?? "");
  console.log(
    `Servidor iniciado em http://${process.env.HOST}:${process.env.PORT}`
  );
});
