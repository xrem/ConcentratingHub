import app from '@server';
import { logger } from '@shared';
import http from 'http';
import { SocketIOServer } from "./core/socket-io-server";

const port = Number(process.env.PORT || 3000);
const httpServer = http.createServer(app);
/*const ioServer = */new SocketIOServer(httpServer);

httpServer.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});