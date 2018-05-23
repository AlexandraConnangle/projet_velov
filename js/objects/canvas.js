var canvas = {

    context: {},
    clickX: new Array(),
    clickY: new Array(),
    clickDrag: new Array(),
    paint: false,

    create_canvas: function () { //fonction qui créée un canvas et l'ajoute au DOM
        var sketch = document.getElementById('sketch-canvas');
        var sketch_style = getComputedStyle(sketch);
        var canvas = document.createElement('canvas');

        sketch.style.display = "block";
        canvas.width = parseInt(sketch_style.getPropertyValue("width"));
        canvas.height = parseInt(sketch_style.getPropertyValue("height"));
        canvas.setAttribute('id', 'canvas-signature');
        sketch.appendChild(canvas);
        if (typeof G_vmlCanvasManager != 'undefined') {
            canvas = G_vmlCanvasManager.initElement(canvas);
        }
        this.context = canvas.getContext("2d");

        this.canvas_mouse_events();
    },

    clear_canvas: function () { //fonction qui efface le canvas
        var thisCanvas = this;

        this.context.clearRect(0, 0, thisCanvas.context.canvas.width, thisCanvas.context.canvas.height);
        this.clickX = new Array();
        this.clickY = new Array();
        this.clickDrag = new Array();
    },

    delete_canvas: function () { //fonction qui fait disparaitre le bloc canvas
        document.getElementById("sketch-canvas").style.display = "none";
        document.getElementsByClassName("buttons-canvas").innerHTML = "<button id=\"delete-button\" onclick=\"reservation.clear_reservation()\">Annuler</button><br/>";
    },

    add_click_position: function (x, y, dragging) { //fonction qui enregistre les données de la souris
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    },

    redraw: function () { //fonction qui dessine les données enregistrées de la souris
        var thisCanvas = this;

        this.context.clearRect(0, 0, thisCanvas.context.canvas.width, thisCanvas.context.canvas.height);
        this.context.strokeStyle = "#000066";
        this.context.lineJoin = "round";
        this.context.lineWidth = 2;

        for (var i = 0; i < thisCanvas.clickX.length; i++) {
            this.context.beginPath();
            if (thisCanvas.clickDrag[i] && i) {
                this.context.moveTo(thisCanvas.clickX[i - 1], thisCanvas.clickY[i - 1]);
            } else {
                this.context.moveTo(thisCanvas.clickX[i] - 1, thisCanvas.clickY[i]);
            }
            this.context.lineTo(thisCanvas.clickX[i], thisCanvas.clickY[i]);
            this.context.closePath();
            this.context.stroke();
        };
    },

    canvas_mouse_events: function () {
        var thisCanvas = this;

        //Evènement au click de la souris (dessine)
        $("#canvas-signature").mousedown(function (e) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;
            thisCanvas.paint = true;
            thisCanvas.add_click_position(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            thisCanvas.redraw();
        });

        //Evènement au mouvement de la souris (dessine si paint = true grace au click en même temps)
        $("#canvas-signature").mousemove(function (e) {
            if (thisCanvas.paint) {
                thisCanvas.add_click_position(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                thisCanvas.redraw();
            }
        });

        //Evènement au relachement de la souris (ne dessine plus)
        $("#canvas-signature").mouseup(function (e) {
            thisCanvas.paint = false;
        });

        //Evènement au départ de la souris (ne dessine plus)
        $("#canvas-signature").mouseleave(function (e) {
            thisCanvas.paint = false;
        });
    },
};
