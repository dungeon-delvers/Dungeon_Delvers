import { Socket } from "socket.io-client";


export default (io: Socket) => {
  io.on('npc:loaded', (result) => {
    console.log(result)
  })
}