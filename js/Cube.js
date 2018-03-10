class Cube extends Figure {
    constructor() {
        super();

        this.position = [{'0': 1, '1': 1},  // положения фигуры для поворота
                         {'0': 1, '1': 1}];

        this.positions = [this.position];   // список положений фигуры

        this.current = this.positions[0];   // выбор текущего положения

    }

}