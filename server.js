import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT;
const DB = `${process.env.DB}`.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);

const server = http.createServer(app);
const io = new Server(server);

mongoose
  .connect(DB)
  .then(() => console.log("Successfully connected to DB..."))
  .catch(() => console.log("Failed connection to DB..."));

app.listen(PORT, () => console.log("Listening on port: ", PORT));

io.on("connect", (socket) => {
  socket.on("disconnect", () => console.log("Client has disconnected"));
});
