/** 11 - Tuple to Object */

/* _____________ 여기에 코드 입력 _____________ */

type TupleToObject<T extends readonly any[]> = {
    [k in T[number]]: k;
}

type Tuple = [number, string];

type T1 = Tuple[0]; //type T1 = number;
type T2 = Tuple[1]; //type T2 = string;
type T3 = Tuple[number]; //type T3 = number | string;

const arr = [
    {id: 1, name: 'Kim'},
    {id: 2, name: 'Lee'},
    {id: 3, name: 'Park'}
];

type Id = typeof arr[number]['id']; //type Id = number;
type Name = typeof arr[number]['name'] //type Name = string;
type Arr = typeof arr[number]; //type Arr = {id: number, name: string};


/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, '2', 3, '4', sym1] as const

type cases = [
    Expect<Equal<TupleToObject<typeof tuple>, { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y' }>>,
    Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1, 2: 2, 3: 3, 4: 4 }>>,
    Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1, [sym2]: typeof sym2 }>>,
    Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1, '2': '2', 3: 3, '4': '4', [sym1]: typeof sym1 }>>,
]

