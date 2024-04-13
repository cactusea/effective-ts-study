class Temp {
    id: number;
    name: string;
    msg: string;

    constructor (id: number, name: string) {
        this.id = id;
        this.name = name;
        this.msg = `${id} is ${name}`;
    }
}

console.log(new Temp(1, 'k').msg);


