function lampe(id) {
    let g = document.createElementNS(nameSpace, 'g');
    this.id = id;
    $(g).attr({
        width: "100%",
        height: "100%"
    });
    let el = $(document.createElementNS(nameSpace, 'circle')).attr({
        id: this.id,
        r: "40",
        cx: "40",
        cy: "40",
        fill: "white",
        stroke: "black"
    });
    $(el).attr("class", "lampe");
    $(el).attr("stroke-width", "2");
    $(g).append(el);
    $(el).attr("onmouseup", "selected='ok';");
    let elem = document.getElementById("svgPrincipale");
    elem.appendChild(g);
    this.rep = el;
    this.val = false;
    this.i = new epingle(0);
    
    $((this.rep)).attr("stroke-width", 4);

    this.activation = function() {
        return this.i.val;
    }

    this.x = function() {
        let name = "#" + this.id;
        return parseFloat($(name).attr("cx"));
    }

    this.y = function() {
        let name = "#" + this.id;
        return parseFloat($(name).attr("cy"));
    }

    //dessin
    this.init = function() {
        return 0;
    }

    this.update = function() {
        if (this.i.val != "ok") {
            if ((this.activation())) {
                $((this.rep)).attr("fill", "yellow");
            } else {
                $((this.rep)).attr("fill", "white");
            }
        }
        let x = this.x();
        let y = this.y();
        this.i.set(x - 60, y - 10);
    }
    composants.push(this);

    cliquer_lampe(this);
}

function cliquer_lampe(lampee) {
    $(lampee.rep).on("mousedown", function(e) {
        e.preventDefault();
        let svgGlobal = document.getElementById("svgPrincipale");;
        $(svgGlobal).append(lampee.rep);
        $(svgGlobal).append($(lampee.i.rep));
        selected = lampee.id;
    });
}