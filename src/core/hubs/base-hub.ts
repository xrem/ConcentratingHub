import {Namespace} from "socket.io";

export abstract class BaseHub {
    public name: string = "";
    public nsp: Namespace | null = null;
}