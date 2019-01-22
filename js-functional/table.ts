import { Cons } from "./cons";

export module Table {
  type Table = Cons.Store;
  type Init = () => Table;
  type Key = string | number | symbol;
  type Value = Cons.InputType;
  type Ptr = Cons.Store;
  type NullAblePtr = Ptr | null;
  type Find = (table: Table, key: Key) => NullAblePtr;
  type Get = (table: Table, key: Key) => Cons.InputType;
  type Set = (table: Table, key: Key, value: Value) => void;
  type IsEmpty = (table: Table) => boolean;

  export const init: Init = () => Cons.cons(null, null);

  export const isEmpty: IsEmpty = t => Cons.car(t) === null;

  const find: Find = (t, key) => {
    const run = (ptr: NullAblePtr): NullAblePtr => {
      if (ptr === null || Cons.car(<Cons.Store>Cons.car(ptr)) === key) {
        return ptr;
      }
      return run(<NullAblePtr>Cons.cdr(ptr));
    };
    return run(<NullAblePtr>Cons.car(t));
  };

  export const get: Get = (t, key) => {
    const ptr = find(t, key);
    return ptr === null ? undefined : Cons.cdr(<Cons.Store>Cons.car(ptr));
  };

  export const set: Set = (t, key, value) => {
    if (isEmpty(t)) {
      const kv = Cons.cons(key, value);
      const pair = Cons.cons(kv, null);
      Cons.setCar(t, pair);
      Cons.setCdr(t, pair);
    } else {
      const ptr = find(t, key);
      if (ptr === null) {
        const kv = Cons.cons(key, value);
        const pair = Cons.cons(kv, null);
        const last = <Cons.Store>Cons.cdr(t);
        Cons.setCdr(last, pair);
        Cons.setCdr(t, pair);
      } else {
        Cons.setCdr(<Cons.Store>Cons.car(ptr), value);
      }
    }
  };
}

/**
 * test
 * test command run `ts-node table.ts`
 */

const t = Table.init();
console.log(`table is empty ? : ${Table.isEmpty(t) ? "yes!" : "no!"}`);
Table.set(t, "a", "1");
Table.set(t, "b", "2");
Table.set(t, "c", "3");
console.log(`table is empty ? : ${Table.isEmpty(t) ? "yes!" : "no!"}`);
console.log(`table[a] = ${Table.get(t, "a")}`);
console.log(`table[b] = ${Table.get(t, "b")}`);
console.log(`table[c] = ${Table.get(t, "c")}`);
