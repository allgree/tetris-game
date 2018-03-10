class Zigzag1 extends Figure {
    constructor() {
        super();
        this.position1 = [{'-1': 1, '0': 1, '1': 0},  // положения фигуры для поворота
                          {'-1': 0, '0': 1, '1': 1}];




        this.position2 = [{'0': 0, '1': 1},
                          {'0': 1, '1': 1},
                          {'0': 1, '1': 0}];


        this.positions = [this.position1, this.position2];                                  // список положений фигуры

        this.current =  this.positions[Math.floor(Math.random() * this.positions.length)];  // выбор текущего положения

    }
}