$(document).ready(function () {
    const connect4 = new Connect4('#connect4')

    connect4.onPlayerMove();

    $('#restart').click(function () {
        connect4.restart();
    })

});