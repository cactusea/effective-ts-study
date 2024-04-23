declare let hasMiddle: boolean;
const firstLast = { first: 'Harry', last: 'Truman'};
// 조건부 속성 추가. 전개 연산자
const president = { ...firstLast, ...(hasMiddle ? { middle: 'S' } : {}) };

function addOptional<T extends object, U extends object>(a: T, b: U | null): T & Partial<U>{
    return { ...a, ...b };
}

// 타입스크립트는 할당 시점에 타입을 추론한다.
type Language = 'JavaScript' | 'Python' | 'Typescript' | 'Typescript2';
function setLanguage(language: Language) { /** .. */ }
setLanguage('JavaScript'); // 정상

// let language = 'JavaScript';
// setLanguage(language); // string 형식의 인수는 Language 형식에 할당될 수 없다.
const language = 'JavaScript';
setLanguage(language); // 상수를 할당하면 language의 타입이 'JavaScript'로 좁혀진다. 정상

function panTo(where: [number, number]): void { /** */ };
const loc: [number, number] = [10, 20];
panTo(loc);

/* case 1. 튜플 */
// const loc2 = [10, 20];
// panTo(loc2); // Argument of type number[] is not assignable to parameter of type [number, number]
// const -> shallow 상수
// as const -> deeply 상수라고 선언
// const loc2 = [10, 20] as const;
// panTo(loc2); // The type readonly [10, 20] is readonly and cannot be assigned to the mutable type [number, number]
// 과하게 정확해서 readonly 가 붙어버렸다.

/* case2. 객체 */
interface GovernedLanguage {
    language: Language;
    organization: string;
}

function complain(language: GovernedLanguage) {
    /* ... */
}

complain({language: 'Typescript', organization: 'Microsoft'}); // ok

// const ts: GovernedLanguage = {
//     language: 'Typescript',
//     organization: 'Microsoft',
// }
// const ts = {
//     language: 'Typescript',
//     organization: 'Microsoft',
// }
// Argument of type { language: string; organization: string; } is not assignable to parameter of type GovernedLanguage
// Types of property language are incompatible.
//     Type string is not assignable to type Language

// const ts = {
//     language: 'Typescript',
//     organization: 'Microsoft',
// } as const;
const ts: GovernedLanguage = {
    language: 'Typescript',
    organization: 'Microsoft',
}
complain(ts);

/* case 3. 콜백 */
function callWithRandomNumbers(fn: (n1: number, n2: number) => void){
    fn(Math.random(), Math.random())
}
callWithRandomNumbers((a, b) => a + b);

/*
* 함수형 기법과 라이브러리
* */
// ex. 절차형
const csvData = '...';
const rawRows = csvData.split('\n');
const headers = rawRows[0].split(',');
// const rows = rawRows.slice(1).map(rowStr => {
//     const row = {};
//     rowStr.split(',').forEach((val, j) => {
//         row[headers[j]] = val;
//     })
//     return row;
// });

// ex. 함수형
const rows =  rawRows.slice(1)
    .map(rowStr => rowStr.split(',').reduce(
        (row, val, i) => (row[headers[i]] = val, row),
        {}));

interface BasketballPlayer {
    name: string;
    team: string;
    salary: number;
}
const teamToPlayers: {[team: string]: BasketballPlayer[]} = {};
let allPlayers = [];
for (const player of allPlayers) {
    const {team} = player;
    teamToPlayers[team] = teamToPlayers[team] || [];
    teamToPlayers[team].push(player);
}

for (const players of Object.values(teamToPlayers)) {
    players.sort((a, b) => b.salary - a.salary);
}

const bestPaid = Object.values(teamToPlayers).map(players => players[0]);
bestPaid.sort((playerA, playerB) => playerB.salary = playerA.salary);
console.log(bestPaid);



































