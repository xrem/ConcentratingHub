import http from 'http';
import SocketIO from 'socket.io';
import { logger } from '@shared';
import {DebugHub} from './hubs/debug-hub';
import {BaseHub} from './hubs/base-hub';
import {FreezerHub} from './hubs/freezer-hub';
import {TerminalHub} from './hubs/terminal-hub';

export class SocketIOServer {
    private readonly server: SocketIO.Server;
    private readonly hubs: BaseHub[] = [];

    constructor(httpServer: http.Server) {
        logger.debug("SocketIOServer Initializing...");
        this.server = SocketIO(httpServer);
        this.attachConnectionLogging(this.server, "ROOT")

        this.initializeHubs();
        this.attachConnectionLoggingToHubs();

        logger.debug("SocketIOServer Initialized!");
    }

    private initializeHubs() {
        const freezerHub = new FreezerHub(this.server);
        const terminalHub = new TerminalHub(this.server);
        this.hubs.push(new DebugHub(this.server, freezerHub, terminalHub));
        this.hubs.push(freezerHub);
        this.hubs.push(terminalHub);
    }

    private attachConnectionLoggingToHubs():void {
        this.hubs.forEach(hub => {
            if (hub.nsp) {
                this.attachConnectionLogging(hub.nsp, `/${hub.name}`);
            }
        })
    }

    private attachConnectionLogging(obj: SocketIO.Server | SocketIO.Namespace, name: string) {
        obj.on("connection", (connection) => {
            logger.info(`[${name}] New connection: ${connection.id}`);
            connection.on("disconnect", () => {
                logger.info(`[${name}] Connection ${connection.id} is closed`);
            });
        });
    }
}

