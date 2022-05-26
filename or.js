function or(id) {
    this.id = id;
    this.name = "#" + this.id;
    this.rep = add(70, 70, "white", "black", this.id, true);
    this.epingle1 = new epingle(0);
    this.epingle2 = new epingle(0);
    this.out = new epingle(1);
    this.out.monCompos = this;
    // la logic de ou 
    this.activation = function() {
        return (this.epingle1.val || this.epingle2.val);
    }

    this.x = function() {
        let name = "#" + this.id;
        return parseFloat($(name).attr("x"));
    }

    this.y = function() {
        let name = "#" + this.id;
        return parseFloat($(name).attr("y"));
    }

    //dessin
    let g = document.createElementNS(nameSpace, 'g');
    $(g).attr({
        width: "100%",
        height: "100%"
    });
    let skin = $(document.createElementNS(nameSpace, 'foreignObject')).attr({
        x: "40",
        y: "40",
        id: (id + "-skin"),
        width: "70",
        height: "70"
    });
    let img = $(document.createElement('img')).attr({
        height: "70",
        width: "70",
        src: "img/or.jpg"
    });
    let iDiv = document.createElement("div");
    $(iDiv).append(img);
    this.skin = skin;
    this.img = img;
    $(skin).append(iDiv);

    $(g).append(skin);
    let elem = document.getElementById("svgPrincipale");
    elem.appendChild(g);

    //mettre a jour la vue du or et les épingles
    this.update = function() {
        let x = this.x();
        let y = this.y();
        this.epingle1.set(x - 20, y);
        this.epingle2.set(x - 20, y + 60);
        this.out.set(x + 70, y + 30);

        let name = "#" + this.id + "-skin";
        let skin = $(name);
        skin.attr("y", (parseFloat($((this.rep)).attr("y")) + 4).toString());
        skin.attr("x", (parseFloat($((this.rep)).attr("x")) + 4).toString());
    }
    composants.push(this);

    cliquer(this);
}