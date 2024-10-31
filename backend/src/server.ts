import express from "express"
import cors from "cors"
import http from "http"
import { Server as SocketIOServer } from "socket.io"
import { eventEmitter } from "./events/gameEvents"
import gameRoutes from "./routes/gameRoutes"

const app = express()
const server = http.createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
  },
})
const PORT = process.env.PORT || 5000

app.use(cors())
app.use("/game", gameRoutes)

io.on("connection", (socket) => {
  console.log("New client connected")

  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

eventEmitter.on("gameUpdate", (update) => {
  io.emit("gameUpdate", update)
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
