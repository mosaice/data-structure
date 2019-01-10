type Store = Dispatch;
type InputType = number | string | undefined | null | Symbol | Store;
type Action = 'car' | 'cdr' | 'setCar' | 'setCdr';
type StoreSetFunc<T = InputType> = (input: T) => T;
type Dispatch = (action: Action) => InputType | StoreSetFunc;

type Cons = (x: InputType, y: InputType) => Dispatch;
type GetFunc = (store: Store) => InputType;
type SetFunc<T = InputType> = (store: Store, value: T) => T;

export module Cons {

  export const cons: Cons = (x, y) => {
    const setX: StoreSetFunc = v => x = v;
    const setY: StoreSetFunc = v => y = v;

    const dispatch: Dispatch = action => {
      switch (action) {
        case 'car':
          return x;
        case 'cdr':
          return y;
        case 'setCar':
          return setX;
        case 'setCdr':
          return setY;
        default:
          throw new Error('unknown action!');
      }
    }

    return dispatch;
  }

  export const car:GetFunc = (store) => store('car') as InputType;
  export const cdr:GetFunc = (store) => store('cdr') as InputType;
  export const setCar:SetFunc = (store, value) => (store('setCar') as StoreSetFunc)(value);
  export const setCdr:SetFunc = (store, value) => (store('setCdr') as StoreSetFunc)(value);
}

/**
 * test
 * test command run `ts-node cons.ts`
 */

// const store = Cons.cons('first', 'second');
// console.log(`car value is ${Cons.car(store)}`);
// console.log(`cdr value is ${Cons.cdr(store)}`);

// Cons.setCar(store, 1);
// Cons.setCdr(store, Symbol('oh yeah'));
// console.log('after change');
// console.log(`car value is ${Cons.car(store)}`);
// console.log(`cdr value is ${(Cons.cdr(store) as Symbol).toString()}`);






