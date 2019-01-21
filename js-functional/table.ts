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
}
