import {Namespace, Server} from "socket.io";
import {logger} from "@shared";
import {BaseHub} from "./base-hub";
import {FreezerHub} from "./freezer-hub";
import {TerminalHub} from "./terminal-hub";

export class DebugHub implements BaseHub {
    private lastTerminalEvent: any = null;
    private lastFreezerEvent: any = null;

    public readonly nsp: Namespace;

    constructor(server: Server, freezerHub: FreezerHub, terminalHub: TerminalHub) {
        this.nsp = server.of(this.name);
        freezerHub.events$.on("data", data => {
            this.lastFreezerEvent = data;
            this.broadcastStatus();
        });
        terminalHub.events$.on("data", data => {
            this.lastTerminalEvent = data;
            this.broadcastStatus();
        });
    }

    public get name(): string {
        return "debug";
    }

    private broadcastStatus(): void {
        const model = {
            terminal: this.lastTerminalEvent,
            freezer: this.lastFreezerEvent,
        };
        const sockets = Object.values(this.nsp.sockets);
        sockets.forEach(s => {
            logger.debug(`[${s.id}] <-- `, model);
            s.emit("event", model)
        });
    }
}