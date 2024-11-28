"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (_io, socket) => {
    socket.on('character:say', ({ characterID, messaage, location, zoneID }) => {
        const { name } = fetchCharacter(args.characterID);
        socket.emit(`zone:${zoneID}character:say`, `${name} says: ${args.message}`, location);
    });
};
//# sourceMappingURL=message.js.map