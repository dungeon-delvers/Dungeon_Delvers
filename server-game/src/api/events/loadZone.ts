import { Server } from 'socket.io';

import LoggerInstance from '@/loaders/logger';

export default (io: Server) => {
  io.on('loadZone', (zone_id: number) => {
    LoggerInstance.info(`Loading zone with ID: ${zone_id}`);
    // Here you would typically load the zone data from a database or file
    // For this example, we'll just log the zone ID
    // You can emit an event back to the client with the loaded zone data if needed
  });
};
