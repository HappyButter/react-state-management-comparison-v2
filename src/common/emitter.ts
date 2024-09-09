import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();
const Emitter = {
  on: (event: string, fn: (payload: object) => void) => eventEmitter.on(event, fn),
  emit: (event: string, payload?: object) => eventEmitter.emit(event, payload),
  removeListener: (event: string, fn?: () => void) => eventEmitter.removeListener(event, fn),
  listenerCount: (event: string) => eventEmitter.listenerCount(event),
};

Object.freeze(Emitter);

export default Emitter;

export enum EmitterEvents {
  DRAW_RANDOM_PIXEL = 'DRAW_RANDOM_PIXEL',
  DRAW_RANDOM_ROW = 'DRAW_RANDOM_ROW',
  SWAP_ROWS = 'SWAP_ROWS',
}