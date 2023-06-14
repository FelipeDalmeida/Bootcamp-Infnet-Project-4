import "reflect-metadata";
import * as dotenv from "dotenv";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./user/user.controler";
dotenv.config();

createExpressServer({
  controllers: [UserController],
  cors: true,
}).listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Servidor iniciado em http://${process.env.HOST}:${process.env.PORT}`
  );
});
