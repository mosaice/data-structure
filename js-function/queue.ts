import { Cons } from "./cons";

export module Queue {
  export type Q = Cons.Store;
  export type Traverse = (item: Cons.Store | null, index: number) => void;

  type Init = () => Q;
  type Enqueue<T = Cons.InputType> = (q: Q, value: T) => T;
  type Dequeue = (q: Q) => Cons.InputType;
  type QIsEmpty = (q: Q) => boolean;
  type ForEach = (
    q: Q,
    callback: (value: Cons.InputType, index: number) => any
  ) => void;
  type GetPtr = (q: Q) => Q;
  type SetPtr = (q: Q, value: Q) => Q;

  const frontPtr: GetPtr = q => <Q>Cons.car(q);
  const rearPtr: GetPtr = q => <Q>Cons.cdr(q);
  const setFrontPtr: SetPtr = (q, pair) => <Q>Cons.setCar(q, pair);
  const setRearPtr: SetPtr = (q, pair) => <Q>Cons.setCdr(q, pair);

  export const init: Init = () => Cons.cons(null, null);
  export const isEmpty: QIsEmpty = q => frontPtr(q) === null;

  export const front: Cons.GetFunc = q => {
    if (isEmpty(q)) {
      throw new Error("Queue is Empty");
    }

    return Cons.car(frontPtr(q));
  };

  export const rear: Cons.GetFunc = q => {
    if (isEmpty(q)) {
      throw new Error("Queue is Empty");
    }

    return Cons.car(rearPtr(q));
  };

  export const enQueue: Enqueue = (q, value) => {
    const cons = Cons.cons(value, null);

    if (isEmpty(q)) {
      setFrontPtr(q, cons);
      setRearPtr(q, cons);
    } else {
      Cons.setCdr(rearPtr(q), cons);
      setRearPtr(q, cons);
    }

    return value;
  };

  export const deQueue: Dequeue = q => {
    if (isEmpty(q)) {
      throw new Error("Queue is Empty");
    }

    const frontPair = frontPtr(q);
    setFrontPtr(q, <Q>Cons.cdr(frontPair));

    return Cons.car(frontPair);
  };

  export const forEach: ForEach = (q, cb) => {
    if (isEmpty(q)) {
      return;
    }

    const traverse: Traverse = (pair, i) => {
      if (pair === null) {
        return;
      }
      cb(Cons.car(pair), i);
      traverse(<Q>Cons.cdr(pair), i + 1);
    };

    traverse(frontPtr(q), 0);
  };
}

/**
 * test
 * test command run `ts-node queue.ts`
 */

// const myQueue = Queue.init();
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
