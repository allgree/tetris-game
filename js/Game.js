class Game {
    constructor(board, preview) {
        this.board = board;                                                    // игровое поле
        this.preview = preview;                                                // поле превью фигруры
        this.base_y = 0;                                                       // координата y базовой клетки
        this.base_x = this.board.size_x/2 - ((this.board.size_x/2)%1) - 1;     // координата x базовой клетки
        this.move_interval = 0;                                                // setInterval движения фигуры
        this.MOVE_TIME_CONST = 500;                                            // время шага фигуры по умолчанию
        this.move_time = this.MOVE_TIME_CONST;                                 // время шага фигуры, изменяемое с повышением уровня
        this.figures_list = [() => {return new Shoulder1()},                   // массив фигур
                             () => {return new Shoulder2()},                   // каждый элемнт возвращает новый объект фигуры
                             () => {return new Zigzag1()},                     // чтобы при появлении новой фигуры можно было
                             () => {return new Zigzag2()},                     // случайным образрм выбрать ее положение
                             () => {return new Ladder()},
                             () => {return new Line()},
                             () => {return new Cube()}
                            ];
        this.figure = {};                                                      // текущая фигура
        this.figure_css = '';                                                  // класс текущей фигуры, определяющий ее цвет
        this.next_figure = {};                                                 // следующая фигура
        this.next_figure_css = '';                                             // класс следующей фигуры
        this.colors = ['green',                                                // список названий классов, определяющих цвета фигур
                       'red',
                       'blue',
                       'yellow',
                       'violet'];
        this.game_status = 'stop';                                             // статус игры
        this.type_cell_g = 'gameboard';                                          // тип клетки - игровая
        this.type_cell_pr = 'prev';                                        // тип клетки - превью фигуры
        this.lines = 0;                                                        // количество убранных линий
        this.level = 1;                                                        // текущий уровень
        this.score = 0;                                                        // текущее количество очков
    }

    /**
     * Рендер новой игры
     * Параметры игры выставляются по умолчанию
     * Рендерятся игровое поле и поле превью фигуры
     */
    render() {
        this.board.render(this.type_cell_g);
        this.preview.render(this.type_cell_pr);
        this.move_time = this.MOVE_TIME_CONST;
        this.lines = 0;
        this.level = 1;
        this.score = 0;
        $('.count_lines').text(this.lines);
        $('.count_level').text(this.level);
        $('.count_score').text(this.score);
    }

    /**
     * Старт новой игры
     * Статус игры - pause - продолжает приостановленную игру
     * Статус игры - stop -  начинает новую игру
     * Статус игры - game - прерывает текущую игру и начинает новую
     */
    start() {
        if (this.game_status === 'pause') {
            $('.info_pause').css('opacity', 0);
            let moveFunk = this.move.bind(this);
            this.move_interval = setInterval(moveFunk, this.move_time);
            this.game_status = 'game';
        } else if (this.game_status === 'stop') {
            this.render();
            this.startPosition();
            this.game_status = 'game';
        } else if (this.game_status === 'game') {
            if (!confirm('Закончить текущую игру и начать новую?')) return;
            this.stop();
            this.render();
            this.startPosition();
            this.game_status = 'game';
        }
    }

    /**
     * Действия на стартовой позиции
     *  - выбор новой фигуры и ее цвета (случайный либо из превью)
     *  - выставление начальных координат базовой клетки
     *  - генерация фигуры для превью
     *  - рендеринг новой фигуры на игровом поле
     *  - коррекция координаты y базовой клетки
     *  - если под фигурой есть свободные клетки, запуск функции движения фигуры
     */
    startPosition() {
        if (!this.next_figure.current) {
            this.figure = this.figures_list[Math.floor(Math.random() * this.figures_list.length)]();
            this.figure_css = this.colors[Math.floor(Math.random() * this.colors.length)];
        } else {
            this.figure = this.next_figure;
            this.figure_css = this.next_figure_css;
        }

        this.base_y = 0;
        this.base_x = this.board.size_x/2 - ((this.board.size_x/2)%1) - 1;

        this.renderPreview();
        this.figure.respawn(this.type_cell_g, this.figure_css, this.base_x, this.base_y);
        this.base_y++;

        if (this.checkBlock()) {
            let moveFunk = this.move.bind(this);
            this.move_interval = setInterval(moveFunk, this.move_time);
        } else {
            this.stop();
        }
    }

    /**
     *  Генерация новой фигуры для превью
     */
    renderPreview() {
        Figure.delete('preview', this.next_figure_css);
        this.next_figure = this.figures_list[Math.floor(Math.random() * this.figures_list.length)]();
        this.next_figure_css = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.next_figure.respawn(this.type_cell_pr, this.next_figure_css, 2, 1);
    }

    /**
     * Движение фигуры
     */
    move() {
        let lenght_figure = this.figure.current.length;
        let x = this.base_x;
        let y = this.base_y + lenght_figure - 1;
        let $lower_cell = $('.' + this.type_cell_g + '[x=' + x +'][y=' + y + ']');
        if (!this.checkBlock() || !$lower_cell.length) {
            clearInterval(this.move_interval);
            $('.board_conteiner .figure').addClass('block').removeClass('figure');
            this.hideLineBlocks();
            this.startPosition();
        } else {
            Figure.delete('board_conteiner', this.figure_css);
            this.figure.respawn(this.type_cell_g, this.figure_css, this.base_x, this.base_y);
            this.base_y++;
        }
    }

    /**
     * Проверка на наличие уложенных блоков под фигурой
     * Возвращает false если есть блоки под фигурой
     * @returns {boolean}
     */
    checkBlock() {
        for (let i = 0; i < this.figure.current.length; i++) {
            for (let key in this.figure.current[i]) {
                let x = this.base_x + +key;
                let y = this.base_y + i;
                let $next_cell = $('.' + this.type_cell_g + '[x=' + x + '][y=' + y + ']');
                if (this.figure.current[i][key] === 1 && $next_cell.hasClass('block')) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Убирает полностью собранные линии
     * и запускаеи функцию сдвига вниз блоков, уложенных выше убранной линии
     */
    hideLineBlocks() {
        let linesOneStep = 0;
        for (let y = 0; y < this.board.size_y; y++) {
            let cells = 0;
            for (let x = 0; x < this.board.size_x; x++) {
                if ($('.' + this.type_cell_g + '[x=' + x +'][y=' + y + ']').hasClass('block')) {
                    cells++;
                }
            }
            if (cells === this.board.size_x) {
                linesOneStep++;
                this.shiftBlocksDown(y);
            }
        }
        if (linesOneStep !== 0) {
            this.lines += linesOneStep;
            this.updateStat(linesOneStep);
        }
    }

    /**
     * Сдвигает вниз блоки, уложенные выше убранной линии
     * @param y - координата убранной линии
     */
    shiftBlocksDown(y) {
        for (let i = y; i >= 0; i--) {
            for (let x = 0; x < this.board.size_x; x++) {
                let down_cell = $('.' + this.type_cell_g + '[x=' + x + '][y=' + i + ']');
                let up_cell = $('.' + this.type_cell_g + '[x=' + x +'][y=' + (i - 1) + ']');
                down_cell.attr('class', up_cell.attr('class'));
            }
        }
    }

    /**
     * Обновление статистики
     * @param linesOneStep - количество линий, убранных за один раз
     */
    updateStat(linesOneStep) {
        $('.count_lines').text(this.lines);

        this.level = this.lines/10 - this.lines%10/10 + 1;
        $('.count_level').text(this.level);

        if (this.move_time > 10) {
            this.move_time = this.MOVE_TIME_CONST - (this.level - 1) * 10;
        }

        let scoreOneStep = 0;
        switch (linesOneStep) {
            case 1: scoreOneStep = 30; break;
            case 2: scoreOneStep = 100; break;
            case 3: scoreOneStep = 300; break;
            case 4: scoreOneStep = 1200; break;
        }
        this.score += scoreOneStep * this.level;
        $('.count_score').text(this.score);
    }


    /**
     * Пауза
     */
    pause () {
        this.game_status = 'pause';
        clearInterval(this.move_interval);
        $('.info_pause').css('opacity', 1);
    }

    /**
     * Стоп игра
     * Вывод информации о сыгранной игре
     */
    stop() {
        $('.info_pause').css('opacity', 0);
        clearInterval(this.move_interval);
        alert('Игра окончена!\n' +
            'Линий собрано: ' + this.lines + '.\n' +
            'Достигнут уровень: ' + this.level + '.\n' +
            'Счет: ' + this.score + '.');
        this.render();
        this.game_status = 'stop';
    }

    // 38 стрелка вверх
    // 37 стрелка влево
    // 39 стрелка вправо
    // 40 стрелка вниз
    // 80 P - пауза
    // 83 S - стоп
    // 71 G - старт/выкл паузы
    /**
     * Обработка событий нажатия кнопок клавиатуры
     * @param keyCode
     */
    controlFigure(keyCode) {
        switch (keyCode) {
            case 38: this.changePosition(); break;
            case 37: this.shift(-1, 0); break;
            case 39: this.shift(1, 0); break;
            case 40: this.shift(0, 1); break;
            case 80: this.pause(); break;
            case 83: if (game.game_status !== 'stop' && confirm('Завершить текущую игру?')) {this.stop()}; break;
            case 71: this.start();
        }
    }

    /**
     * Поворот текущей фигуры
     */
    changePosition() {
        let number = this.figure.positions.indexOf(this.figure.current);
        let new_figure = [];
        if (number < this.figure.positions.length - 1) {
            new_figure = this.figure.positions[++number];
        } else {
            new_figure = this.figure.positions[0];
        }

        if (this.checkChangePosition(new_figure)) {
            this.figure.current = new_figure;
            Figure.delete('board_conteiner', this.figure_css);
            this.figure.respawn(this.type_cell_g, this.figure_css, this.base_x, this.base_y);
        }
    }

    /**
     * Проверяет наложение нового положения фигуры на край поля или уложенные блоки
     * @param figure - проверяемая фигура
     * @returns {boolean} - возвращает true, если наложения нет
     */
    checkChangePosition(figure) {
        for (let i = 0; i < figure.length; i++) {
            for (let key in figure[i]) {
                let x = this.base_x + +key;
                let y = this.base_y + i;
                let cell = $('.' + this.type_cell_g + '[x=' + x + '][y=' + y + ']');
                if (figure[i][key] === 1 && (!cell[0] || cell.hasClass('block'))) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Сдвиг фигуры влево, вправо или вниз
     * @param horiz_offset - шаг горизонтального сдвига
     * @param vert_offset - шаг вертикального слвига
     */
    shift(horiz_offset, vert_offset) {
        if (this.checkShift(horiz_offset, vert_offset)) {
            this.base_x += horiz_offset;
            this.base_y += vert_offset;
            Figure.delete('board_conteiner', this.figure_css);
            this.figure.respawn(this.type_cell_g, this.figure_css, this.base_x, this.base_y);
        }

    }

    /**
     * Проверка сдвигаемой фигуры на наложение на край поля или уложенные блоки
     * @param horiz_offset
     * @param vert_offset
     * @returns {boolean}
     */
    checkShift(horiz_offset, vert_offset) {
        for (let i = 0; i < this.figure.current.length; i++) {
            for (let key in this.figure.current[i]) {
                let x = this.base_x + +key + horiz_offset;
                let y = this.base_y + i + vert_offset;
                let cell = $('.' + this.type_cell_g + '[x=' + x + '][y=' + y + ']');
                if (this.figure.current[i][key] === 1 && (!cell[0] || cell.hasClass('block'))) {
                    return false;
                }
            }
        }
        return true;
    }

}