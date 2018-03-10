'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cube = function (_Figure) {
        _inherits(Cube, _Figure);

        function Cube() {
                _classCallCheck(this, Cube);

                var _this = _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).call(this));

                _this.position = [{ '0': 1, '1': 1 }, // положения фигуры для поворота
                { '0': 1, '1': 1 }];

                _this.positions = [_this.position]; // список положений фигуры

                _this.current = _this.positions[0]; // выбор текущего положения

                return _this;
        }

        return Cube;
}(Figure);