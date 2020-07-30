export const drawLines = (canvas, num_cells_x, num_cells_y) => {
    const context = canvas.getContext('2d');
    context.strokeStyle = 'rgba(0, 0, 0, 0.6)';

    var x, y, i;
    for (i = 0; i <= num_cells_x; i++){
        x = Math.floor(i * canvas.width / num_cells_x);
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
    }
    for (i = 0; i <= num_cells_y; i++){
        y = Math.floor(i * canvas.height / num_cells_y);
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
    }
}

export const fillCell = (x, y, color, canvas, num_cells_x, num_cells_y) => {
    var context = canvas.getContext('2d');
    var grid_width = canvas.width / num_cells_x;
    var grid_height = canvas.height / num_cells_y;

    context.fillStyle = color;
    context.fillRect(x*grid_width, y*grid_height, grid_width - 1, grid_height - 1);
}