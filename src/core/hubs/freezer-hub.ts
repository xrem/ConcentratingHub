import {Namespace, Server} from "socket.io";
import {logger} from "@shared";
import {BasePublisherHub} from "./base-publisher-hub";
import {EventEmitter} from "events";

export class FreezerHub implements BasePublisherHub {
    public readonly nsp: Namespace;
    public readonly events$: EventEmitter;

    constructor(server: Server) {
        this.nsp = server.of(this.name);
        this.events$ = new EventEmitter();
        this.nsp.on('connection', socket => {
            socket.on('event', (data: any) => this.newData(data));
        });
    }

    private newData(data: any): void {
        //logger.debug(`Publishing data into ${this.name} hub:`, data);
        this.events$.emit('data', data);
    }

    public get name(): string {
        return "Freezer";
    }

}