import { Queue } from "./queue";
import { Cons } from "./cons";

export module ArrayLike {
  type ArrayLike = Queue.Q;
  type Init = (length?: number) => void;
  type Make = (length?: number) => ArrayLike;
  type Lenth = (arr: ArrayLike) => number;
  type Push = (arr: ArrayLike, value: Cons.InputType) => number;
  type Get = (arr: ArrayLike, index: number) => Cons.InputType;
  type Set<T = Cons.InputType> = (arr: ArrayLike, index: number, value: T) => T;
  type Pop = (arr: ArrayLike) => Cons.InputType;
  type ForEach = (
    arr: ArrayLike,
    callback: (value: Cons.InputType, index: number) => any
  ) => void;
  type Map = (
    arr: ArrayLike,
    callback: (value: Cons.InputType, index: number) => any
  ) => ArrayLike;

  export const init = (len?: number) => {
    let _length = len || 0;

    const q = Queue.init();

    if (len) {
      while (len-- > 0) {
        Queue.enQueue(q, Cons.cons(null, null));
      }
    }

    const _getPtr = (ptr, i) => {
      if (ptr === null) {
        return null;
      }
      return i === 0 ? ptr : _getPtr(Cons.cdr(ptr), i - 1);
    };

    const length = () => _length;

    const push = value => {
      Queue.enQueue(q, Cons.cons(value, null));
      return ++_length;
    };

    const pop = () => {
      if (Queue.isEmpty(q)) {
        throw new Error("array is empty!");
      }
      --_length;
      return Queue.deQueue(q);
    };

    const getValue = index => {
      if (index >= _length || !_length || index < 0) {
        return undefined;
      }

      if (index === 0) {
        return Queue.front(q);
      }

      if (index > 0) {
        const ptr = _getPtr(Cons.car(q), index);
        return ptr ? Cons.car(q) : undefined;
      }
    };

    const setValue = (index, value) => {
      if (index < 0) {
        throw new Error("range error");
      }
    };

    const dispatch = (action: string) => {
      switch (action) {
        case "length":
          return length;
        case "cdr":
          return y;
        case "setCar":
          return setX;
        case "setCdr":
          return setY;
        default:
          throw new Error("unknown action!");
      }
    };

    return dispatch;
  };
}

/**
 * test
 * test command run `ts-node queue.ts`
 */

// const myQueue = Queue.make();
// console.log(`Q is empty ? : ${Queue.isEmpty(myQueue) ? "yes!" : "no!"}`);
// Queue.enQueue(myQueue, "first");
// Queue.enQueue(myQueue, "second");
// Queue.enQueue(myQueue, 3);

// Queue.forEach(myQueue, (value, index) => {
//   console.log(`value: ${value}, index: ${index}`);
// });

// console.log(`Q is empty ? : ${Queue.isEmpty(myQueue) ? "yes!" : "no!"}`);

// console.log(`DeQueue value is ${Queue.deQueue(myQueue)}`);
// Queue.forEach(myQueue, (value, index) => {
//   console.log(`after dequeue, value: ${value}, index: ${index}`);
// });
// console.log(`DeQueue value is ${Queue.deQueue(myQueue)}`);
// console.log(`DeQueue value is ${Queue.deQueue(myQueue)}`);
// console.log(`Q is empty ? : ${Queue.isEmpty(myQueue) ? "yes!" : "no!"}`);
