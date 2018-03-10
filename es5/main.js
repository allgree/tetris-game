'use strict';

$(document).ready(function () {
    "use strict";

    var SIZE_X = 10;
    var SIZE_Y = 20;
    var board = new Board(SIZE_X, SIZE_Y, $('.board_conteiner')); // игровое поле
    var preview = new Board(6, 6, $('.preview')); // поле предпросмотра фигуры
    var game = new Game(board, preview); // объект игры
    game.render();

    $('.start').on('click', function () {
        game.start();
    });

    $('.pause').on('click', function () {
        game.pause();
    });

    $('.stop').on('click', function () {
        if (game.game_status !== 'stop' && confirm('Завершить текущую игру?')) game.stop();
    });

    $(document).on('keydown', function (e) {
        game.controlFigure(e.keyCode);
    });
});