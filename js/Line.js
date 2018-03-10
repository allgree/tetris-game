class Line extends Figure {
    constructor() {
        super();


        this.position1 = [{'-1': 1, '0': 1, '1': 1, '2': 1}];  // положения фигуры для поворота




        this.position2 = [{'0': 1},
                          {'0': 1},
                          {'0': 1},
                          {'0': 1}];









        this.positions = [this.position1, this.position2];                                // список положений фигуры
        this.current = this.positions[Math.floor(Math.random() * this.positions.length)]; // выбор текущего положения

    }
}