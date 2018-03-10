class Shoulder2 extends Figure {
    constructor() {
        super();

        this.position1 = [{'-1': 0, '0': 0, '1': 1},   // положения фигуры для поворота
                          {'-1': 1, '0': 1, '1': 1}];

        this.position2 = [{'0': 1, '1': 0},
                          {'0': 1, '1': 0},
                          {'0': 1, '1': 1}];

        this.position3 = [{'-1': 1, '0': 1, '1': 1},
                          {'-1': 1, '0': 0, '1': 0}];

        this.position4 = [{'0': 1, '1': 1},
                          {'0': 0, '1': 1},
                          {'0': 0, '1': 1}];


        this.positions = [this.position1, this.position2, this.position3, this.position4]; // список положений фигуры

        this.current = this.positions[Math.floor(Math.random() * this.positions.length)];  // выбор текущего положения

    }
}