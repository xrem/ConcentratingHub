import {BaseHub} from "./base-hub";
import EventEmitter = NodeJS.EventEmitter;

export abstract class BaseConsumerHub extends BaseHub {
    abstract subscribe(observableEvents: EventEmitter): void
}