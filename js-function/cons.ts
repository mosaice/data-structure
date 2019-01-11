export module Cons {
  type InputType = number | string | undefined | null | Symbol | Store;
  type GetAction = "car" | "cdr";
  type SetAction = "setCar" | "setCdr";
  type Action = GetAction | SetAction;
  type StoreSetFunc<T = InputType> = (input: T) => T;
  type GetDispatch = (action: GetAction) => InputType;
  type SetDispatch = (action: SetAction) => StoreSetFunc;
  type Store = GetDispatch & SetDispatch;

  type Cons = (x: InputType, y: InputType) => Store;
  type GetFunc = (store: GetDispatch & SetDispatch) => InputType;
  type SetFunc<T = InputType> = (
    store: GetDispatch & SetDispatch,
    value: T
  ) => T;

  export const cons: Cons = (x, y) => {
    const setX: StoreSetFunc = v => (x = v);
    const setY: StoreSetFunc = v => (y = v);

    const dispatch = (action: Action) => {
      switch (action) {
        case "car":
          return x;
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

    return dispatch as Store;
  };

  export const car: GetFunc = store => store("car");
  export const cdr: GetFunc = store => store("cdr");
  export const setCar: SetFunc = (store, value) => store("setCar")(value);
  export const setCdr: SetFunc = (store, value) => store("setCdr")(value);
}

/**
 * test
 * test command run `ts-node cons.ts`
 */

// const store = Cons.cons("first", "second");
// console.log(`car value is ${Cons.car(store)}`);
// console.log(`cdr value is ${Cons.cdr(store)}`);

// Cons.setCar(store, 1);
// Cons.setCdr(store, Symbol("oh yeah"));
// console.log("after change");
// console.log(`car value is ${Cons.car(store)}`);
// console.log(`cdr value is ${(Cons.cdr(store) as Symbol).toString()}`);
