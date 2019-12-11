import {BaseHub} from "./base-hub";
import {EventEmitter} from "events";

export abstract class BasePublisherHub extends BaseHub {
    abstract events$: EventEmitter;
}