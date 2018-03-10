'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Figure = function () {
    function Figure() {
        _classCallCheck(this, Figure);

        this.current = []; // текущая фигура
        this.positions = []; // текущее положение фигуры
    }

    /**
     * Ренден фигуры в поле указанного типа
     * @param type - тип поля (игровое/превью)
     * @param color_class - класс, определяющий цвет фигуры
     * @param cell_x - координата х базовой клетки
     * @param cell_y - координата y базовой клетки
     */


    _createClass(Figure, [{
        key: 'respawn',
        value: function respawn(type, color_class) {
            var cell_x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
            var cell_y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            for (var i = 0; i < this.current.length; i++) {
                for (var key in this.current[i]) {
                    if (this.current[i][key] === 1) {
                        $('#' + type + (cell_x + +key) + '_' + (cell_y + i)).addClass('figure').addClass(color_class);
                    }
                }
            }
        }

        /**
         * Удаление фигуры в указанном поле
         * @param conteiner_class - поле, содержащее удаляемую фигуру
         * @param color_class - цвет удаляемой фигуры
         */

    }], [{
        key: 'delete',
        value: function _delete(conteiner_class, color_class) {
            $('.' + conteiner_class + ' .figure').removeClass('figure').removeClass(color_class);
        }
    }]);

    return Figure;
}();