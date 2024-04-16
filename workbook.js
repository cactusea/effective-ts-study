function getComponent(vector, axis) {
    return vector[axis];
}
// let x = 'x';
var x = 'x'; // const는 재할당될 수 없으므로 더 좁은 타입으로 추론된다.
var vec = { x: 10, y: 10, z: 30 };
getComponent(vec, x); // let x -> TS2345: Argument of type string is not assignable to parameter of type "x" | "y" | "z
var mixed = ['x', 1];
var v1 = {
    x: 1,
    y: 2
};
var v2 = {
    x: 1,
    y: 2
};
var v3 = {
    x: 1,
    y: 2
}; // type is { readonly x: 1, readonly y: 2 }
/**
 * 타입 좁히기
 */
var el = document.getElementById('foo');
if (el) {
    console.log(el); // type is HTMLElement
    el.innerHTML = 'Party Time'.blink();
}
else {
    console.log(el); // type is null
    alert('No element found.');
}
var el2 = document.getElementById('foo');
if (!el2) {
    throw new Error('No element found.');
}
el2.innerHTML = 'Party Time'.blink(); // type is HTMLElement
// instanceof 로 타입 좁히기
function contains(text, search) {
    if (search instanceof RegExp) {
        return !!search.exec(text); // 'search' type is RegExp
    }
    return text.includes(search); // 'search' type is string
}
function pickAB(ab) {
    if ('a' in ab) {
        ab; // type is A
    }
    else {
        ab; // type is B
    }
    ab; // type is A | B
}
// isArray로 좁히기
function containsArray(text, terms) {
    var termList = Array.isArray(terms) ? terms : [terms]; // type is string[]
}
function handleEvent(e) {
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
function isInputElement(el) {
    return 'value' in el;
}
function getElementContent(el) {
    if (isInputElement(el)) {
        el; // type is HTMLInputElement
        return el.value;
    }
    el; // type is HTMLElement
    return el.textContent;
}
var jacson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
// members type is (string | undefined)[]
var members = ['Janet', 'Michael'].map(function (who) { return jacson5.find(function (n) { return n === who; }); });
// 이럴때는 filter를 써도 undefined가 걸러지지 않는다.
var membersF = ['Janet', 'Michael']
    .map(function (who) { return jacson5.find(function (n) { return n === who; }); })
    .filter(function (who) { return who !== undefined; }); // type is  (string | undefined)[] ...
// 타입 가드를 사용해보자 ...
// isDefined가 호출된 범위에서 x is T 가 True인 경우, x는 T인 것으로 타입이 좁혀진다.
function isDefined(x) {
    return x !== undefined;
}
var membersD = ['Janet', 'Michael'].map(function (who) { return jacson5.find(function (n) { return n === who; }); }).filter(isDefined); // type is string[]
