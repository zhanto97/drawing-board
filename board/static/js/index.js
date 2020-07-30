import {enhanceCanvasDPI, getMousePos} from './helper.js';
import {drawLines, fillCell} from './draw.js'

var NUM_CELLS_X = null;
var NUM_CELLS_Y = null;
var BOARD = null;
var DRAWING = false;

const initialize = async () => {
    const canvas = document.getElementById('canvas-canvas');
    enhanceCanvasDPI(canvas);
    setupWebSocket(canvas);
}

const setupWebSocket = (canvas) => {
    const socket = new WebSocket('ws://' + window.location.host + '/ws/');

    socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'initialize_board'){
            setupBoard(data.width, data.height, data.board, socket);
        }
        else if (data.type === 'fill_cell'){
            BOARD[data.y][data.x] = data.color;
            fillCell(data.x, data.y, data.color, canvas, NUM_CELLS_X, NUM_CELLS_Y);
        }
    };

    socket.onclose = (e) => {
        console.error('Socket closed unexpectedly');
    };
}

const setupBoard = (width, height, board, socket) => {
    NUM_CELLS_X = width;
    NUM_CELLS_Y = height;
    BOARD = board;
    const canvas = document.getElementById('canvas-canvas');
    for (var i = 0; i < BOARD.length; i++){
        for (var j = 0; j < BOARD[0].length; j++){
            fillCell(j, i, BOARD[i][j], canvas, NUM_CELLS_X, NUM_CELLS_Y)
        }
    }
    drawLines(canvas, NUM_CELLS_X, NUM_CELLS_Y);
    setupDrawingListeners(canvas, socket);
}

const setupDrawingListeners = (canvas, socket) => {
    canvas.addEventListener("mousedown", async function (e) {
        DRAWING = true;
        const coord = getMousePos(canvas, e, NUM_CELLS_X, NUM_CELLS_Y);
        const colorPicker = document.getElementById('color-picker');
        if (BOARD[coord.y][coord.x] !== colorPicker.value){
            BOARD[coord.y][coord.x] = colorPicker.value
            socket.send(JSON.stringify({
                'type': 'fill_cell',
                'x': coord.x,
                'y': coord.y,
                'color': colorPicker.value
            }));
            fillCell(coord.x, coord.y, colorPicker.value, canvas, NUM_CELLS_X, NUM_CELLS_Y);
        }
    });

    canvas.addEventListener("mouseup", function (e) {
        DRAWING = false;
    });

    canvas.addEventListener("mousemove", async function (e) {
        if (DRAWING){
            const coord = getMousePos(canvas, e, NUM_CELLS_X, NUM_CELLS_Y);
            const colorPicker = document.getElementById('color-picker');
            if (BOARD[coord.y][coord.x] !== colorPicker.value){
                BOARD[coord.y][coord.x] = colorPicker.value
                socket.send(JSON.stringify({
                    'type': 'fill_cell',
                    'x': coord.x,
                    'y': coord.y,
                    'color': colorPicker.value
                }));
                fillCell(coord.x, coord.y, colorPicker.value, canvas, NUM_CELLS_X, NUM_CELLS_Y);
            }
        }
    });
}

export {initialize}