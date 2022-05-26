function not(id) {
    this.id = id;
    this.name = "#" + this.id;
    this.rep = add(70, 70, "white", "black", this.id, true);
    this.epingle1 = new epingle(0);
    this.out = new epingle(1);
    this.out.monCompos = this;
    // la logic
    this.activation = function() {
        if (!this.epingle1.val) {
            return true;
        }
        return false;
    }

    this.x = function() {
        let name = "#" + this.id;
        return parseFloat($(name).attr("x"));
    }

    this.y = function() {
        let name = "#" + this.id;
        return parseFloat($(name).attr("y"));
    }

    //design
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
        src: "img/not.jpg"
    });
    let iDiv = document.createElement("div");
    $(iDiv).append(img);
    this.skin = skin;
    this.img = img;
    $(skin).append(iDiv);
    $(g).append(skin);
    let elem = document.getElementById("svgPrincipale");
    elem.appendChild(g);


    this.update = function() {
        //les epingles
        let x = this.x();
        let y = this.y();
        this.epingle1.set(x - 20, y + 30);
        this.out.set(x + 70, y + 30);

        let name = "#" + this.id + "-skin";
        let skin = $(name);
        skin.attr("x", (parseFloat($((this.rep)).attr("x")) + 4).toString());
        skin.attr("y", (parseFloat($((this.rep)).attr("y")) + 4).toString());
    }
    composants.push(this);

    cliquernot(this);
}

function cliquernot(no) {
    $((no.img)).on("mousedown", function(e) {
        e.preventDefault();
        let svg = document.getElementById("svgPrincipale");
        $(svg).append(no.rep);
        $(svg).append($(no.epingle1.rep));
        $(svg).append($(no.out.rep));
        $(svg).append($(no.skin));
        selected = no.id;
    });
    $((no.img)).on("mouseup", function() {
        selected = "";
    });
}