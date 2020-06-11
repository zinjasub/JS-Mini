class Connect4vKIT {
    constructor(selector) {
        this.ROWS = 6;
        this.COLS = 7;
        this.player = 'red';
        this.selector = selector;
        this.isGameOver = false;
        this.onPlayerMove = function () { };
        this.createGrid();
        this.setupEventListeners();
    }

    createGrid() {
        const $board = $(this.selector);
        $board.empty();
        this.isGameOver = false;
        this.player = 'red';
        for (let row = 0; row < this.ROWS; row++) {
            const $row = $('<div>')
                .addClass('row');
            for (let col = 0; col < this.COLS; col++) {
                const $col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col', col)
                    .attr('data-row', row);
                $row.append($col);
            }
            $board.append($row);
        }
    }

    onPlayerMove = function () {
        this.player = (this.player === 'red') ? 'yellow' : 'red';
        $('#player').text(this.player);

    }

    placeKit() {
        let randCol = Math.floor(Math.random() * 7);
        let $lastEmptyCell = this.findLastEmptyCell(randCol);
        while ($lastEmptyCell === null) {
            randCol = Math.floor(Math.random() * 7);
            $lastEmptyCell = this.findLastEmptyCell(randCol);
        }
        const randRow = $lastEmptyCell.data('row');
        const $cell = $($(`.col[data-col='${randCol}'][data-row='${randRow}']`)[0]);

        if ($cell.hasClass('empty')) {
            setTimeout(() => {
                this.placePiece(this, $cell);
                const winner = this.getWinner(
                    $lastEmptyCell.data('row'),
                    $lastEmptyCell.data('col')
                )
                this.player = (this.player === 'red') ? 'yellow' : 'red';

                if (winner) {
                    this.handleWin()
                    return;
                }
            }, 600);
        } else {
            this.placeKit()
        }
    }

    findLastEmptyCell(col) {
        const cells = $(`.col[data-col='${col}']`);
        for (let i = cells.length - 1; i >= 0; i--) {
            const $cell = $(cells[i]);
            if ($cell.hasClass('empty')) {
                return $cell;
            }
        }
        return null;
    }

    handleWin(){
        $('.col.empty').removeClass('empty');
        this.isGameOver = true;
        setTimeout(() => {
            if (this.player === "red"){
                alert(`Game Over! You Lost! KIT, the dumb AI has won!`);
            }else{
                alert(`Game Over! You have won!!!!!`);
            }
            
        }, 25);
    }

    placePiece(obj, cell){
        cell.removeClass(`empty next-${obj.player}`);
        cell.addClass(obj.player);
        cell.data('player', obj.player);
    }

    setupEventListeners() {
        const $board = $(this.selector);
        const that = this;



        $board.on('mouseenter', '.col.empty', function () {
            var player = that.player;
            if (that.isGameOver) return;
            if (player === 'yellow') { return };
            const col = $(this).data('col');
            const $lastEmptyCell = that.findLastEmptyCell(col);
            $lastEmptyCell.addClass(`next-${player}`);
        });

        $board.on('mouseleave', '.col', function () {
            $('.col').removeClass(`next-${that.player}`);
        });

        $board.on('click', '.col.empty', function () {
            if (that.isGameOver) return;
            const col = $(this).data('col');
            const $lastEmptyCell = that.findLastEmptyCell(col);
            that.placePiece(that, $lastEmptyCell)

            const winner = that.getWinner(
                $lastEmptyCell.data('row'),
                $lastEmptyCell.data('col')
            )
            
            that.player = (that.player === 'red') ? 'yellow' : 'red';
            
            if (winner) {
                that.handleWin()
                return;
            }

    
    if(that.player === 'yellow') {
    that.placeKit();
}
that.onPlayerMove();
        });
    }

    getWinner(row, col) {
    const that = this;

    function $getCell(i, j) {
        return $(`.col[data-row='${i}'][data-col='${j}']`);
    }

    function checkDirection(direction) {
        let total = 0;
        let i = row + direction.i;
        let j = col + direction.j;
        let $next = $getCell(i, j);
        while (i >= 0 &&
            i < that.ROWS &&
            j >= 0 &&
            j < that.COLS &&
            $next.data('player') === that.player
        ) {
            total++;
            i += direction.i;
            j += direction.j;
            $next = $getCell(i, j);
        }
        return total;
    }

    function checkWin(directionA, directionB) {
        const total = 1 +
            checkDirection(directionA) +
            checkDirection(directionB);
        if (total >= 4) {
            return that.player;
        } else {
            return null;
        }
    }

    function checkDiagonalBLtoTR() {
        return checkWin({ i: 1, j: -1 }, { i: -1, j: 1 });
    }

    function checkDiagonalTLtoBR() {
        return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 });
    }

    function checkVerticals() {
        return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 });
    }

    function checkHorizontals() {
        return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 });
    }

    return checkVerticals() ||
        checkHorizontals() ||
        checkDiagonalBLtoTR() ||
        checkDiagonalTLtoBR();
}



restart() {
    this.createGrid();
    this.onPlayerMove();
}
}