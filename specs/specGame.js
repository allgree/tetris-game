"use strict";
describe('Проверка класса Game', function () {
    let size_x = 10;
    let size_y = 20;
    let board = new Board(10, 20, $('.conteiner'));
    let preview = new Board(6, 6, $('.preview'));
    let game = new Game(board, preview);
    let shoulder1 = new Shoulder1();
    it('Проверка свойств', function () {
        expect(game.board).toBe(board);
        expect(game.preview).toBe(preview);
        expect(game.base_y).toBe(0);
        expect(game.base_x).toBe(size_x/2 - ((size_x/2)%1) - 1);
        expect(game.move_interval).toBe(0);
        expect(game.MOVE_TIME_CONST).toBe(500);
        expect(game.move_time).toBe(game.MOVE_TIME_CONST);
        expect(game.figures_list.length).toBe(7);
        expect(game.figures_list[0]().positions).toEqual(shoulder1.positions);
        expect(game.figure).toEqual({});
        expect(game.figure_css).toBe('');
        expect(game.next_figure).toEqual({});
        expect(game.next_figure_css).toBe('');
        for (let i = 0; i < game.colors.length; i++) {
            expect(game.colors[i]).toMatch(/\w+/);
        }
        expect(game.game_status).toBe('stop');
        expect(game.type_cell_g).toBe('g_cell_');
        expect(game.type_cell_pr).toBe('pr_cell_');
        expect(game.lines).toBe(0);
        expect(game.level).toBe(1);
        expect(game.score).toBe(0);
    });

    it('Проверка метода checkBlock', function () {
        game.figure = new Shoulder1();
        expect(game.checkBlock()).toBeTruthy();
    });
    it('Проверка метода checkChangePosition', function () {
        let figure = new Shoulder1();
        expect(game.checkChangePosition(figure.position2)).toBeFalsy();
    });
    it('Проверка метода checkShift', function () {
        expect(game.checkShift(1, 0)).toBeFalsy();
    });
});