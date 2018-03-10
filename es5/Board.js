'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board(x, y, $conteiner) {
        _classCallCheck(this, Board);

        this.size_x = x;
        this.size_y = y;
        this.$conteiner = $conteiner;
    }

    /**
     * Рендер поля указанного типа
     * @param type - тип поля (игровое/превью)
     */


    _createClass(Board, [{
        key: 'render',
        value: function render(type) {
            this.$conteiner.empty();
            var $row = void 0;
            for (var i = 0; i < this.size_y; i++) {
                $row = $('<div />', {
                    class: 'rows',
                    id: type + 'row_' + i
                });
                for (var j = 0; j < this.size_x; j++) {
                    $row.append($('<div />', {
                        class: 'cell',
                        id: type + j + '_' + i
                    }));
                }
                this.$conteiner.append($row);
            }
        }
    }]);

    return Board;
}();