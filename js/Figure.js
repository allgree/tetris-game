class Figure {
    constructor() {
        this.current = [];   // текущая фигура
        this.positions = []; // текущее положение фигуры
    }

    /**
     * Ренден фигуры в поле указанного типа
     * @param type - тип поля (игровое/превью)
     * @param color_class - класс, определяющий цвет фигуры
     * @param cell_x - координата х базовой клетки
     * @param cell_y - координата y базовой клетки
     */
    respawn(type, color_class, cell_x = 4, cell_y = 0) {
        for (let i = 0; i < this.current.length; i++) {
            for (let key in this.current[i]) {
                if (this.current[i][key] === 1) {
                    let x = cell_x + +key;
                    let y = cell_y + i;
                    $('.' + type + '[x=' + x + '][y=' + y + ']').addClass('figure').addClass(color_class);
                }
            }
        }
    }

    /**
     * Удаление фигуры в указанном поле
     * @param conteiner_class - поле, содержащее удаляемую фигуру
     * @param color_class - цвет удаляемой фигуры
     */
    static delete(conteiner_class, color_class) {
        $('.' + conteiner_class + ' .figure').removeClass('figure').removeClass(color_class);
    }
}