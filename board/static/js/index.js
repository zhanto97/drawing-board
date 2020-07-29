import {enhanceCanvasDPI, getMousePos} from './helper.js';
import {drawLines, fillCell} from './draw.js'

var NUM_CELLS_X = null;
var NUM_CELLS_Y = null;
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
            setupBoard(data.width, data.height, socket)
        }
        else if (data.type === 'fill_cell'){
            fillCell(data.x, data.y, data.color, canvas, NUM_CELLS_X, NUM_CELLS_Y)
        }
    };

    socket.onclose = (e) => {
        console.error('Socket closed unexpectedly');
    };
}

const setupBoard = (width, height, socket) => {
    NUM_CELLS_X = width;
    NUM_CELLS_Y = height;
    const canvas = document.getElementById('canvas-canvas');
    setupDrawingListeners(canvas, socket);
    drawLines(canvas, NUM_CELLS_X, NUM_CELLS_Y);
}

const setupDrawingListeners = (canvas, socket) => {
    canvas.addEventListener("mousedown", function (e) {
        DRAWING = true;
        const coord = getMousePos(canvas, e, NUM_CELLS_X, NUM_CELLS_Y);
        socket.send(JSON.stringify({
            'type': 'fill_cell',
            'x': coord.x,
            'y': coord.y,
            'color': '(0, 0, 0)'
        }));
        fillCell(coord.x, coord.y, '(0, 0, 0)', canvas, NUM_CELLS_X, NUM_CELLS_Y);
    });

    canvas.addEventListener("mouseup", function (e) {
        DRAWING = false;
    });

    canvas.addEventListener("mousemove", function (e) {
        if (DRAWING){
            const coord = getMousePos(canvas, e, NUM_CELLS_X, NUM_CELLS_Y);
            socket.send(JSON.stringify({
                'type': 'fill_cell',
                'x': coord.x,
                'y': coord.y,
                'color': '(0, 0, 0)'
            }));
            fillCell(coord.x, coord.y, '(0, 0, 0)', canvas, NUM_CELLS_X, NUM_CELLS_Y);
        }
    });
}

export {initialize}