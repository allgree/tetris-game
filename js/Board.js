class Board {
    constructor(x, y, $conteiner) {
        this.size_x = x;
        this.size_y = y;
        this.$conteiner = $conteiner;
    }

    /**
     * Рендер поля указанного типа
     * @param type - тип поля (игровое/превью)
     */
    render(type) {
        this.$conteiner.empty();
        let $row;
        for (let i = 0; i < this.size_y; i++) {
            $row = $('<div />', {
                class: 'rows ' + type,
                y: i
            });
            for (let j = 0; j < this.size_x; j++) {
                $row.append($('<div />', {
                    class: 'cell ' + type,
                    x: j,
                    y: i
                }))
            }
            this.$conteiner.append($row);
        }
    }

}