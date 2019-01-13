import { Cons } from './cons';

export module ArrayLike {
  type ArrayLike = LenAction &
    PushAction &
    PopAction &
    EmptyAction &
    GetAction &
    SetAction &
    ForEachAction;
  type Ptr = Cons.Store;
  type NullAblePtr = Ptr | null;
  type Init = (length?: number) => ArrayLike;

  type _Length = () => number;
  type _Push = (value: Cons.InputType) => number;
  type _Pop = () => Cons.InputType;
  type _Empty = () => boolean;
  type _Get = (index: number) => Cons.InputType;
  type _Set<T = Cons.InputType> = (index: number, value: T) => T;
  type _ForEach = (callback: Callback) => void;

  type Action =
    | 'length'
    | 'push'
    | 'pop'
    | 'get'
    | 'set'
    | 'empty?'
    | 'foreach';
  type LenAction = (action: 'length') => _Length;
  type PushAction = (action: 'push') => _Push;
  type PopAction = (action: 'pop') => _Pop;
  type EmptyAction = (action: 'empty?') => _Empty;
  type GetAction = (action: 'get') => _Get;
  type SetAction = (action: 'set') => _Set;
  type ForEachAction = (action: 'foreach') => _ForEach;

  type Lenth = (arr: ArrayLike) => number;
  type IsEmpty = (arr: ArrayLike) => boolean;
  type Push = (arr: ArrayLike, value: Cons.InputType) => number;
  type Get = (arr: ArrayLike, index: number) => Cons.InputType;
  type Set<T = Cons.InputType> = (arr: ArrayLike, index: number, value: T) => T;
  type Pop = (arr: ArrayLike) => Cons.InputType;
  type Callback = (value: Cons.InputType, index: number) => any;
  type ForEach = (arr: ArrayLike, callback: Callback) => void;

  export const init: Init = len => {
    if (len && len < 0) {
      throw new Error('array size error');
    }
    let _length = 0;

    const _arr = Cons.cons(null, null);
    const _firstPtr = () => <NullAblePtr>Cons.car(_arr);
    const _lastPtr = () => <NullAblePtr>Cons.cdr(_arr);

    const isEmpty: _Empty = () => _firstPtr() === null;

    const _getPtr = (i: number): NullAblePtr => {
      if (isEmpty()) {
        return null;
      }
      const _goToNextPrt = (ptr: Ptr, index: number): NullAblePtr => {
        if (!index || ptr === null) {
          return ptr;
        }
        const next = <Ptr>Cons.cdr(<Ptr>Cons.cdr(ptr));

        return _goToNextPrt(next, index - 1);
      };

      return _goToNextPrt(<Ptr>_firstPtr(), i);
    };

    const _insert = (value: Cons.InputType) => {
      const ptr = Cons.cons(null, null);
      const pair = Cons.cons(value, ptr);
      if (isEmpty()) {
        Cons.setCar(_arr, pair);
        Cons.setCdr(_arr, pair);
      } else {
        const pre = <Ptr>_lastPtr();
        const prePtr = <Ptr>Cons.cdr(pre);
        Cons.setCdr(prePtr, pair);
        Cons.setCar(ptr, pre);
        Cons.setCdr(_arr, pair);
      }
      _length++;
      return value;
    };

    const _insertMore = (value: Cons.InputType, i: number) => {
      if (!i) {
        return;
      }
      if (i > 0) {
        _insert(value);
      }
      _insertMore(value, i - 1);
    };

    if (len) {
      _insertMore(undefined, len);
    }

    const length: _Length = () => _length;

    const push: _Push = value => {
      _insert(value);
      return _length;
    };

    const pop: _Pop = () => {
      if (isEmpty()) {
        throw new Error('array is empty!');
      }
      --_length;
      const last = <Ptr>_lastPtr();
      const pre = <NullAblePtr>Cons.car(<Ptr>Cons.cdr(last));

      if (pre === null) {
        Cons.setCar(_arr, null);
      } else {
        Cons.setCdr(<Ptr>Cons.cdr(<Ptr>Cons.cdr(pre)), null);
        Cons.setCdr(_arr, pre);
      }
      return Cons.car(last);
    };

    const getValue: _Get = index => {
      if (index >= _length || !_length || index < 0) {
        return undefined;
      }

      if (index === 0) {
        return Cons.car(<Ptr>_firstPtr());
      }

      if (index > 0) {
        const ptr = _getPtr(index);
        return ptr ? Cons.car(ptr) : undefined;
      }

      // if (index < 0) {
      //   const ptr = _reGetPtr((index + 1) *);
      //   return ptr ? Cons.car(ptr) : undefined;
      // }
    };

    const setValue: _Set = (index, value) => {
      if (index < 0) {
        throw new Error('range error');
      }

      if (index >= _length) {
        let insertNum = index - _length;
        _insertMore(undefined, insertNum);
        _insert(value);
      } else {
        const ptr = <Ptr>_getPtr(index);
        Cons.setCar(ptr, value);
      }
      return value;
    };

    const forEach: _ForEach = callback => {
      if (isEmpty()) {
        return;
      }

      const travers = (pair: NullAblePtr, i: number) => {
        if (pair === null) {
          return;
        }
        callback(Cons.car(pair), i);
        travers(<NullAblePtr>Cons.cdr(<Ptr>Cons.cdr(pair)), i + 1);
      };

      travers(_firstPtr(), 0);
    };

    const dispatch = (action: Action) => {
      switch (action) {
        case 'length':
          return length;
        case 'push':
          return push;
        case 'pop':
          return pop;
        case 'get':
          return getValue;
        case 'set':
          return setValue;
        case 'empty?':
          return isEmpty;
        case 'foreach':
          return forEach;
        default:
          throw new Error('unknown action!');
      }
    };

    return dispatch as ArrayLike;
  };

  export const length: Lenth = store => store('length')();
  export const isEmpty: IsEmpty = store => store('empty?')();
  export const push: Push = (store, value) => store('push')(value);
  export const pop: Pop = store => store('pop')();
  export const get: Get = (store, index) => store('get')(index);
  export const set: Set = (store, index, value) => store('set')(index, value);
  export const forEach: ForEach = (store, cb) => store('foreach')(cb);
}

/**
 * test
 * test command run `ts-node arrayLike.ts`
 */

const arr1 = ArrayLike.init();
const arr2 = ArrayLike.init(10);
console.log(`arr1 is empty ? : ${ArrayLike.isEmpty(arr1) ? 'yes!' : 'no!'}`);
console.log(`arr1 length = ${ArrayLike.length(arr1)}`);
console.log('\n');
console.log(`arr2 is empty ? : ${ArrayLike.isEmpty(arr2) ? 'yes!' : 'no!'}`);
console.log(`arr2 length = ${ArrayLike.length(arr2)}`);
console.log('\n');
ArrayLike.push(arr1, 'test arr1');
ArrayLike.push(arr2, 'test arr2');
ArrayLike.forEach(arr1, (value, index) =>
  console.log(`arr1[${index}] = ${value}`)
);
console.log('\n');
ArrayLike.forEach(arr2, (value, index) =>
  console.log(`arr2[${index}] = ${value}`)
);
console.log('\n');
console.log(`arr1 length = ${ArrayLike.length(arr1)}`);
console.log(`arr2 length = ${ArrayLike.length(arr2)}`);
console.log('\n');
console.log(`arr1[0] = ${ArrayLike.get(arr1, 0)}`);
console.log(`arr2[10] = ${ArrayLike.get(arr2, 10)}`);
console.log('\n');

ArrayLike.push(arr2, 'test pop value');
console.log(`arr2 length = ${ArrayLike.length(arr2)}`);
console.log(`arr2 pop value = ${ArrayLike.pop(arr2)}`);
console.log(`arr2 length = ${ArrayLike.length(arr2)}`);

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
