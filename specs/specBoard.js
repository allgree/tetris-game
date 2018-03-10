"use strict";
describe('Проверка класса Board', function () {
    let size_x = 10;
    let size_y = 20;
    let $conteiner = $('.conteiner');
    let board = new Board(size_x, size_y, $conteiner);
    it('Проверка свойств', function () {
       expect(board.size_x).toBe(size_x);
       expect(board.size_y).toBe(size_y);
       expect(board.$conteiner).toBe($conteiner);
    });
});