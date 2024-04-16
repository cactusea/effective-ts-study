/**
 * 타입 넓히기
 * */
interface Vector3 { x: number; y: number; z: number; }
function getComponent( vector: Vector3, axis: 'x' | 'y' | 'z' ) {
    return vector[axis];
}

// let x = 'x';
const x = 'x'; // const는 재할당될 수 없으므로 더 좁은 타입으로 추론된다.
let vec = { x: 10, y: 10, z: 30};
getComponent(vec, x); // let x -> TS2345: Argument of type string is not assignable to parameter of type "x" | "y" | "z

const mixed = [ 'x', 1 ];

const v1 = {
    x: 1,
    y: 2
}

const v2 = {
    x: 1 as const,
    y: 2
};

const v3 = {
    x: 1,
    y: 2
} as const; // type is { readonly x: 1, readonly y: 2 }

/**
 * 타입 좁히기
 */
const el: HTMLElement | null = document.getElementById('foo');
if (el){
    console.log(el); // type is HTMLElement
    el.innerHTML = 'Party Time'.blink();
} else {
    console.log(el);  // type is null
    alert('No element found.');
}

const el2: HTMLElement | null = document.getElementById('foo');
if (!el2){
    throw new Error('No element found.');
}
el2.innerHTML = 'Party Time'.blink(); // type is HTMLElement

// instanceof 로 타입 좁히기
function contains (text: string, search: string|RegExp) {
    if (search instanceof RegExp){
        return !!search.exec(text); // 'search' type is RegExp
    }
    return text.includes(search); // 'search' type is string
}

// 속성 체크로 타입 좁히기
interface A { a: number;}
interface B { b: number;}
function pickAB(ab: A | B){
    if ('a' in ab){
        ab; // type is A
    } else {
        ab // type is B
    }
    ab // type is A | B
}

// isArray로 좁히기
function containsArray (text: string, terms: string|string[]) {
    const termList = Array.isArray(terms) ? terms : [terms]; // type is string[]
}

// 명시적 '태그' 붙이기
// tagged union, discriminated union
interface UploadEvent {
    type: 'upload';
    filename: string;
    content: string;
}

interface DownloadEvent {
    type: 'download';
    filename: string;
}

type AppEvent = UploadEvent | DownloadEvent;

function handleEvent (e: AppEvent) {
    switch (e.type) {
        case 'upload':
            e; // type is UploadEvent
            break;
        case 'download':
            e; // type is DownloadEvent
            break;
    }
}

// 사용자 정의 타입 가드
// el is HTMLInputElement -> true인 경우 타입을 좁힐 수 있다.
function isInputElement (el: HTMLElement): el is HTMLInputElement {
    return 'value' in el;
}

function getElementContent(el: HTMLElement) {
    if (isInputElement(el)) {
        el; // type is HTMLInputElement
        return el.value;
    }
    el; // type is HTMLElement
    return el.textContent;
}

const jacson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];

// members type is (string | undefined)[]
const members = ['Janet', 'Michael'].map(who => jacson5.find(n => n === who));

// 이럴때는 filter를 써도 undefined가 걸러지지 않는다.
const membersF =
    ['Janet', 'Michael']
        .map(who => jacson5.find(n => n === who))
        .filter(who => who !== undefined); // type is  (string | undefined)[] ...

// 타입 가드를 사용해보자 ...
// isDefined가 호출된 범위에서 x is T 가 True인 경우, x는 T인 것으로 타입이 좁혀진다.
function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}
const membersD = ['Janet', 'Michael'].map(
    who => jacson5.find(n => n === who)
).filter(isDefined); // type is string[]