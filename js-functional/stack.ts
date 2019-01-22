import { Cons } from "./cons";

export module Stack {
  export type S = Cons.Store;

  type Init = () => S;
  type Push<T = Cons.InputType> = (s: S, value: T) => T;
  type Pop = (s: S) => Cons.InputType;
  type IsEmpty = (s: S) => boolean;
  type Top = Pop;

  export const init: Init = () => Cons.cons(null, null);
  export const isEmpty: IsEmpty = s => Cons.car(s) === null;

  export const top: Top = s => {
    if (isEmpty(s)) {
      throw new Error("Stack is Empty");
    }

    return Cons.car(<Cons.Store>Cons.car(s));
  };

  export const push: Push = (s, value) => {
    const pair = Cons.cons(value, null);
    if (isEmpty(s)) {
      // 空栈
      Cons.setCar(s, pair);
    } else {
      Cons.setCdr(pair, Cons.car(s));
      Cons.setCar(s, pair);
    }
    return value;
  };

  export const pop: Pop = s => {
    if (isEmpty(s)) {
      // 空栈
      throw new Error("stack already empty!");
    } else {
      const top = <Cons.Store>Cons.car(s);
      const next = Cons.cdr(top);
      const value = Cons.car(top);
      Cons.setCar(s, next);
      return value;
    }
  };
}

/**
 * test
 * test command run `ts-node stack.ts`
 */
// const s = Stack.init();
// console.log(`stack is empty ? : ${Stack.isEmpty(s) ? "yes!" : "no!"}`);
// Stack.push(s, "first");
// Stack.push(s, "second");
// Stack.push(s, 3);
// console.log(`stack top is ${Stack.top(s)}`);
// console.log(`stack pop value = ${Stack.pop(s)}`);
// console.log(`stack top is ${Stack.top(s)}`);
// console.log(`stack is empty ? : ${Stack.isEmpty(s) ? "yes!" : "no!"}`);
