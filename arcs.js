let l_count = 0;
let lines = [];

function arc(start, end) {
    this.id = l_count.toString() + "line";
    l_count++;
    // start contient le premier épingle, end le dernier
    this.start = start;
    this.end = end;

    lines.push(this);

    // dessin de l'arc
    let g = document.createElementNS(nameSpace, 'g');
    $(g).attr({
        width: "100%",
        height: "100%"
    });
    let el = $(document.createElementNS(nameSpace, 'line')).attr({
        id: this.id,
        x1: "40",
        y1: "40",
        x2: "55",
        y2: "55",
        stroke: "black",
        fill: "yellow"
    });
    $(el).attr("stroke-width", "2");
    $(g).append(el);
    let elem = document.getElementById("svgPrincipale");
    elem.appendChild(g);


    this.rep = el;
    this.name = "#" + this.id;

    this.update = function() {
        let adr = this.start.name;
        let temp = $(adr).attr("x");
        let n = this.name;

        temp = (parseFloat(temp)).toString();
        $(n).attr("x1", temp);
        temp = $(adr).attr("y");
        temp = (parseFloat(temp) + 10).toString();

        $(n).attr("y1", temp);
        adr = this.end.name;
        temp = $(adr).attr("x");
        temp = (parseFloat(temp) + 20).toString();

        $(n).attr("x2", temp);
        temp = $(adr).attr("y");
        temp = (parseFloat(temp) + 10).toString();
        
        $(n).attr("y2", temp);

        //la couleur de l'arc dépend de l'pingle du start
        if (this.start.val) {
            $((this.rep)).attr("stroke", "yellow");
        } else {
            $((this.rep)).attr("stroke", "black");
        }
    }
}
