import {enhanceCanvasDPI} from './helper.js';

const initialize = async () => {
    const canvas = document.getElementById('canvas-canvas');
    enhanceCanvasDPI(canvas);

    console.log("index.js loaded");
}

export {initialize}