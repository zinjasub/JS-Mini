$(document).ready(function () {
    
    const connect4vKIT = new Connect4vKIT('#connect4vKIT') //extra

    
    connect4vKIT.onPlayerMove(); //extra



    $('#restart').click(function () { //extra
        connect4vKIT.restart();
    })
});