// Cria a toolbar usando classes CSS
const toolbarHTML = `
<div id="drawing-extension-toolbar">

    <!-- Rubber Group -->
    <div class="ext-button-group">
        <button id="rubber-btn-1" class="ext-btn ext-rubber-btn-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M225,80.4,183.6,39a24,24,0,0,0-33.94,0L31,157.66a24,24,0,0,0,0,33.94l30.06,30.06A8,8,0,0,0,66.74,224H216a8,8,0,0,0,0-16h-84.7L225,114.34A24,24,0,0,0,225,80.4ZM108.68,208H70.05L42.33,180.28a8,8,0,0,1,0-11.31L96,115.31,148.69,168Zm105-105L160,156.69,107.31,104,161,50.34a8,8,0,0,1,11.32,0l41.38,41.38a8,8,0,0,1,0,11.31Z"></path></svg>
        </button>
        <button id="rubber-btn-2" class="ext-btn ext-rubber-btn-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ext-icon ext-icon-sm">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </button>

        <!-- Rubber Menu -->
        <div id="rubber-dropdown" class="dropdown-menu" style="display: none;">
            <div id="rubber-dropdown-removeall" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="rubber-dropdown-svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                Remove All
            </div>
        </div>

    </div>

    <!-- Draw Group -->
    <div class="ext-button-group">
        <button id="draw-btn-1" class="ext-btn ext-draw-btn-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ext-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
        </button>
        <button id="draw-btn-2" class="ext-btn ext-draw-btn-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ext-icon ext-icon-sm">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </button>

        <!-- LineWidth -->
        <div id="linewidth-dropdown" class="linewidth-dropdown-menu" style="display: none;">
            <div id="linewidth-dropdown" class="linewidth-dropdown-item">
                <div id="linewidth-example" class="linewidth-dropdown-example"></div>
                    LineWidth
                <input id="linewidth-input" class="linewidth-dropdown-input"/>
            </div>
        </div>
    </div>

    <!-- Color Button -->
    <button id="color-btn" class="ext-single-btn">
        <div class="ext-btn-content">
            Color 
            <div id="color-indicator" class="ext-color-indicator"></div>
        </div>

        <!-- Color Menu -->
        <div id="color-dropdown" class="color-dropdown-menu" style="display: none;">
            <div id="color-dropdown-removeall" class="color-dropdown-item">
                <div id="color-black" class="ext-color-indicator-black"></div>
                <div id="color-white" class="ext-color-indicator-white"></div>
                <div id="color-blue" class="ext-color-indicator-blue"></div>
                <div id="color-red" class="ext-color-indicator-red"></div>
                <div id="color-green" class="ext-color-indicator-green"></div>
                <div id="color-yellow" class="ext-color-indicator-yellow"></div>
            </div>
        </div>
    </button>

    <!-- Close Button -->
    <button id="close-btn" class="ext-single-btn ext-close-btn">
        <div class="ext-btn-content">
            Close 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ext-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    </button>
</div>
`;

let canvas, ctx;
let drawing = false;
let eraseMode = false;
let buttonClicked = false
let rubberButton = false
let currentColor = "black"
let currentLineWidth = 3
let currentLine = [];
let allLines = [];

// Eventos dos botões
function createToolbar() {

    
    document.body.insertAdjacentHTML('beforeend', toolbarHTML);
    const toolbar = document.getElementById("drawing-extension-toolbar");

    //draw
    document.getElementById('draw-btn-1').onclick = () => {
        if (!buttonClicked) {

            if (!canvas) {
                enableDrawing();
            }

            // focus in pencil
            document.getElementById("draw-btn-1").style.setProperty("background-color", "#e5e7eb", "important");

            // stoped to focus in rubber
            document.getElementById("rubber-btn-1").style.setProperty("background-color", "white", "important");
            
            canvas.style.cursor = 'default';

            //close color
            document.getElementById("color-dropdown").style.display = "none";

            // close line width
            document.getElementById("linewidth-dropdown").style.display = "none";

            // close rubber
            document.getElementById("rubber-dropdown").style.display = "none";

            buttonClicked = true
            rubberButton = false
            eraseMode = false
            console.log("ativado")
        } else {
            
            document.getElementById("draw-btn-1").style.setProperty("background-color", "white", "important");
            buttonClicked = false
            console.log("desativado")
        }
        
        
    };

    // LineWidth
    document.getElementById('draw-btn-2').onclick = () => {
        if (document.getElementById("linewidth-dropdown").style.display === "none") {

            //open line with
            document.getElementById("linewidth-dropdown").style.display = "flex";

            // close line width
            document.getElementById("color-dropdown").style.display = "none";

            // close rubber
            document.getElementById("rubber-dropdown").style.display = "none";

            const inputLineWidth = document.getElementById("linewidth-input");

            inputLineWidth.oninput = () => {
                if (inputLineWidth.value >= 30) {
                    currentLineWidth = 30;
                } else {
                    currentLineWidth = inputLineWidth.value;
                }
                document.getElementById("linewidth-example").style.setProperty("width", `${currentLineWidth}px`, "important");
                ctx.lineWidth = Number(currentLineWidth) || 3;
            }

        } else {
            document.getElementById("linewidth-dropdown").style.display = "none";
        }
    }

    // color
    document.getElementById('color-btn').onclick = () => {
        if (document.getElementById("color-dropdown").style.display === "none") {
            // open color
            document.getElementById("color-dropdown").style.display = "flex";

            // close line width
            document.getElementById("linewidth-dropdown").style.display = "none";

            // close rubber
            document.getElementById("rubber-dropdown").style.display = "none";

        } else {
            document.getElementById("color-dropdown").style.display = "none";
        }
    };

    // Color black
    document.getElementById("color-black").onclick = () => {
        currentColor = "black";
        document.getElementById("color-indicator").style.setProperty('background-color', currentColor, 'important');
        ctx.strokeStyle = currentColor;

        // simulate a click in pencil
        buttonClicked = false
        document.getElementById('draw-btn-1').click();
    }

    // Color white
    document.getElementById("color-white").onclick = () => {
        currentColor = "white"
        document.getElementById("color-indicator").style.setProperty('background-color', currentColor, 'important');
        ctx.strokeStyle = currentColor;
    }

    // Color blue
    document.getElementById("color-blue").onclick = () => {
        currentColor = "blue"
        document.getElementById("color-indicator").style.setProperty('background-color', currentColor, 'important');
        ctx.strokeStyle = currentColor;
    }

    // Color red
    document.getElementById("color-red").onclick = () => {
        currentColor = "red"
        document.getElementById("color-indicator").style.setProperty('background-color', currentColor, 'important');
        ctx.strokeStyle = currentColor;
    }

    // Color green
    document.getElementById("color-green").onclick = () => {
        currentColor = "green"
        document.getElementById("color-indicator").style.setProperty('background-color', currentColor, 'important');
        ctx.strokeStyle = currentColor;
    }

    // Color yellow
    document.getElementById("color-yellow").onclick = () => {
        currentColor = "yellow"
        document.getElementById("color-indicator").style.setProperty('background-color', currentColor, 'important');
        ctx.strokeStyle = currentColor;
    }

    //rubber
    document.getElementById('rubber-btn-1').onclick = () => {

        if (!rubberButton) {
            eraseMode = true;
            rubberButton = true;
            buttonClicked = false;
            canvas.style.cursor = 'crosshair'
            document.getElementById("rubber-dropdown").style.display = "none";

            // stoped to focus in pencil
            document.getElementById("draw-btn-1").style.setProperty("background-color", "white", "important");

            // focus in rubber
            document.getElementById("rubber-btn-1").style.setProperty("background-color", "#e5e7eb", "important");

            //close color
            document.getElementById("color-dropdown").style.display = "none";

            // close line width
            document.getElementById("linewidth-dropdown").style.display = "none";

            // close rubber
            document.getElementById("rubber-dropdown").style.display = "none";


        } else {
            eraseMode = false;
            rubberButton = false
            canvas.style.cursor = 'default';

            // stoped to focus in rubber
            document.getElementById("rubber-btn-1").style.setProperty("background-color", "white", "important");
        }
        
    }

    // rubber menu
    document.getElementById("rubber-btn-2").onclick = () => {
        if (document.getElementById("rubber-dropdown").style.display === "none") {
            // open rubber
            document.getElementById("rubber-dropdown").style.display = "flex";

            // close color
            document.getElementById("color-dropdown").style.display = "none";

            // close line width
            document.getElementById("linewidth-dropdown").style.display = "none";
        } else {
            document.getElementById("rubber-dropdown").style.display = "none";
        }
    }

    // remove all
    document.getElementById("rubber-dropdown-removeall").onclick = () => {
        if (canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            allLines = [];
            buttonClicked = false;
            rubberButton = false;
            enableDrawing();
        }
    }

    //close
    document.getElementById('close-btn').onclick = () => {
        toolbar.remove();

        if (canvas) {
            canvas.removeEventListener('mousedown', startDraw);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDraw);
            canvas.removeEventListener('mouseleave', endDraw);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            allLines = [];
            canvas.remove();
            canvas = null;
            ctx = null;
            buttonClicked = false;
            rubberButton = false;
            eraseMode = false;
        }
    }
}

function enableDrawing() {
    canvas = document.createElement("canvas");
    canvas.id = "drawing-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'auto';
    canvas.style.zIndex = '999998';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.body.appendChild(canvas);

    // Config
    ctx = canvas.getContext("2d");
    ctx.lineWidth = currentLineWidth;
    ctx.strokeStyle = currentColor;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.imageSmoothingEnabled = true;
    ctx.globalCompositeOperation = "source-over"

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mouseleave', endDraw);
}

// start draw
function startDraw(e) {

    if (!buttonClicked && !rubberButton) return;

    const mousePoint = [e.clientX, e.clientY];

    if (eraseMode) {
        allLines = allLines.filter(line => !isPointNearLine(mousePoint, line));

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        allLines.forEach(line => drawSmoothedLine(line));

        return;
    }

    

    drawing = true;
    currentLine = [[e.clientX, e.clientY]];
}

function draw(e) {
    if (!drawing) return;

    currentLine.push([e.clientX, e.clientY]);
    
    // redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // draw the saved lines with soft
    allLines.forEach(line => drawSmoothedLine(line));
    
    // draw the actually line not soft
    if (currentLine.length > 1) {
        drawSmoothedLine(currentLine);
    }
}

function endDraw() {
    drawing = false;

    if (!eraseMode && currentLine.length > 0) {
        const simplified = simplifyLineRDP(currentLine, 3);

        simplified.color = currentColor;
        simplified.lineWidth = currentLineWidth;

        ctx.beginPath();
        if (simplified.length > 0) {
            ctx.moveTo(simplified[0][0], simplified[0][1]);
            for (let i = 1; i < simplified.length; i++) {
                ctx.lineTo(simplified[i][0], simplified[i][1]);
            }
            ctx.stroke();
        }

        allLines.push(simplified);
    }
    
    currentLine = [];
    
}

// Adicione esta função para verificar se um ponto está próximo de uma linha
function isPointNearLine(point, line, threshold = 10) {
    for (let i = 0; i < line.length - 1; i++) {
        const lineStart = line[i];
        const lineEnd = line[i + 1];
        
        const distance = distanceToLineSegment(point, lineStart, lineEnd);
        if (distance <= threshold) {
            return true;
        }
    }
    return false;
}

// Adicione esta função auxiliar para calcular distância ponto-linha
function distanceToLineSegment(point, lineStart, lineEnd) {
    const [px, py] = point;
    const [x1, y1] = lineStart;
    const [x2, y2] = lineEnd;
    
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    
    if (lenSq === 0) return Math.sqrt(A * A + B * B);
    
    let t = dot / lenSq;
    
    if (t < 0) {
        return Math.sqrt(A * A + B * B);
    } else if (t > 1) {
        const E = px - x2;
        const F = py - y2;
        return Math.sqrt(E * E + F * F);
    } else {
        const projX = x1 + t * C;
        const projY = y1 + t * D;
        const distX = px - projX;
        const distY = py - projY;
        return Math.sqrt(distX * distX + distY * distY);
    }
}

// Smoothed Line
var drawSmoothedLine = function(line){
    var i,p;
    ctx.strokeStyle = line.color || currentColor;
    ctx.lineWidth = line.lineWidth || currentLineWidth;
    ctx.beginPath()
    ctx.moveTo(line[0][0],line[0][1])
    for(i = 0; i < line.length-1; i++){
       p = line[i];
       p1 = line[i+1]
       if(p.length === 2){ // linear 
            ctx.lineTo(p[0],p[1])
       }else
       if(p.length === 4){ // bezier 2nd order
           ctx.quadraticCurveTo(p[2],p[3],p1[0],p1[1]);
       }else{              // bezier 3rd order
           ctx.bezierCurveTo(p[2],p[3],p[4],p[5],p1[0],p1[1]);
       }
    }
    if(p.length === 2){
        ctx.lineTo(p1[0],p1[1])
    }
    ctx.stroke();
}

// Smoothed Line after end
var simplifyLineRDP = function(points, length) {
    var simplify = function(start, end) {
        var maxDist, index, i, xx , yy, dx, dy, ddx, ddy, p1, p2, p, t, dist, dist1;
        p1 = points[start];
        p2 = points[end];   
        xx = p1[0];
        yy = p1[1];
        ddx = p2[0] - xx;
        ddy = p2[1] - yy;
        dist1 = (ddx * ddx + ddy * ddy);
        maxDist = length;
        for (var i = start + 1; i < end; i++) {
            p = points[i];
            if (ddx !== 0 || ddy !== 0) {
                t = ((p[0] - xx) * ddx + (p[1] - yy) * ddy) / dist1;
                if (t > 1) {
                    dx = p[0] - p2[0];
                    dy = p[1] - p2[1];
                } else 
                if (t > 0) {
                    dx = p[0] - (xx + ddx * t);
                    dy = p[1] - (yy + ddy * t);
                } else {
                    dx = p[0] - xx;
                    dy = p[1] - yy;
                }
            }else{
                dx = p[0] - xx;
                dy = p[1] - yy;
            }
            dist = dx * dx + dy * dy 
            if (dist > maxDist) {
                index = i;
                maxDist = dist;
            }
        }

        if (maxDist > length) {
            if (index - start > 1){
                simplify(start, index);
            }
            newLine.push(points[index]);
            if (end - index > 1){
                simplify(index, end);
            }
        }
    }    
    var end = points.length - 1;
    var newLine = [points[0]];
    simplify(0, end);
    newLine.push(points[end]);
    return newLine;
}


chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "toggleToolbar") {
        const tb = document.getElementById("drawing-extension-toolbar");
        if (tb) {
            tb.remove();
        } else {
            createToolbar();
        }
    }
})