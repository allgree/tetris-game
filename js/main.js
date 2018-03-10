
$(document).ready(function () {
    "use strict";
    const SIZE_X = 10;
    const SIZE_Y = 20;
    let board = new Board(SIZE_X, SIZE_Y, $('.board_conteiner')); // игровое поле
    let preview = new Board(6, 6, $('.preview'));                 // поле предпросмотра фигуры
    let game = new Game(board, preview);                          // объект игры
    game.render();

    $('.start').on('click', () => {
        game.start();
    });

    $('.pause').on('click', () =>  {
        game.pause();
    });

    $('.stop').on('click', () => {
        if (game.game_status !== 'stop' && confirm('Завершить текущую игру?')) game.stop();
    });

    $(document).on('keydown', function (e) {
        game.controlFigure(e.keyCode);
    })


});