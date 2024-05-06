// function processBar(b: Bar) {
//     /** ... */
// }
// function f(){
//     // const x: any = expressionReturnigFoo();
//     // processBar(x);
//     const x = expressionReturnigFoo();
//     processBar(x as any);
// }

// declare function cacheLast<T extends Function>(fn: T): T;
declare function shallowEqual(a: any, b: any): boolean;
function cacheLast<T extends Function>(fn: T): T{
    let lastArgs: any[] | null = null;
    let lastResult: any;
    return function (...args){
    // (...args: any[]) => any is not assignable to type T
        if(!lastArgs || !shallowEqual(lastArgs, args)){
            lastResult = fn(...args);
            lastArgs = args;
        }
        return lastResult;
    } as unknown as T;
}

function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
    for (const [k, aVal] of Object.entries(a)){
        if(!(k in b) || aVal !== (b as any)[k]) {
            return false;
        }
    }
    return Object.keys(a).length === Object.keys(b).length;
}

function rangeCheck(start: number, limit: number) {
    const out: any[] = [];
    for (let i= start; i < limit; i++) {
        out.push(i);
    }
    return out;
}

function double<T extends number | string>(x: T): T extends string ? string : number;
function double(x: any){
    return x + x;
}
function double2(x: number|string){
    return double(x);
}

const obj = {
    one: 'uno',
    two: 'dos',
    three: 'tres'
}

let k: keyof typeof obj;
for (k in obj) {
    const v = obj[k];
}

interface ABC {
    a: string;
    b: string;
    c: number;
}

// function foo(abc: ABC) {
//     for (const k in abc){
//         const v = abc[k];
//     }
// }
function foo(abc: ABC) {
    for (const [k, v] of Object.entries(abc)){
        k; // string
        v; // any
    }
}

const xx = { a: 'a', b: 'b', c: 2, d: new Date()};
foo(xx); // 정상적으로 호출됨 -> error

