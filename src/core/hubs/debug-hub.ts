import {Namespace, Server} from "socket.io";
import {logger} from "@shared";
import {BaseHub} from "./base-hub";

export class DebugHub implements BaseHub {
    private _counter: number = 0;
    private get counter(): number {
        return ++this._counter;
    }

    public readonly nsp: Namespace;

    constructor(server: Server) {
        this.nsp = server.of(this.name);

        setInterval(() => {
            const event = { counter: this.counter };
            logger.debug(`[/${this.name}] Broadcasting event`, event);
            this.nsp.emit("event", event);
        }, 2000);
    }

    public get name(): string {
        return "debug";
    }
}