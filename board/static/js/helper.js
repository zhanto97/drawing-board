/*
 * Fixes the blurriness of image on canvas
 */
export const enhanceCanvasDPI = (canvas) => {
    var dpi = window.devicePixelRatio;
    var style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    var style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

/*
 * Finds cookie with key NAME
 */
export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const getMousePos = (canvas, e, num_cells_x, num_cells_y) => {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    var gridX = Math.floor(x / (rect.width / num_cells_x))
    var gridY = Math.floor(y / (rect.height / num_cells_y))
    return {
        x: gridX,
        y: gridY
    };
}
