"use strict";
describe('Проверка класса фигуры', function () {
    let figure = new Shoulder2();
    it('Проверка свойств', function () {
        expect(figure.positions.length).toBe(4);
        expect(figure.position1.indexOf(figure.positions));
        expect(figure.current.indexOf(figure.positions)).toBeTruthy();
    });
});