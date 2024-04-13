var Temp = /** @class */ (function () {
    function Temp(id, name) {
        this.id = id;
        this.name = name;
        this.msg = "".concat(id, " is ").concat(name);
    }
    return Temp;
}());
console.log(new Temp(1, 'k').msg);
