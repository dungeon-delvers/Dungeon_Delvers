import { PlayerCharacter } from '@shared/types/playerCharacter'
import { Socket } from "socket.io-client";

const characterLoaded = (result: PlayerCharacter)

export const playerCharacter = (io: Socket) => {
  io.on('character:load')

}