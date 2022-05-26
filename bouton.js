function bouton(id) {
    this.wait = true;
    this.id = id;
    this.rep = add(70, 70, "white", "black", this.id, true);
    this.out = new epingle(1);
    this.val = false;
    addevt(this);
    $((this.rep)).attr("stroke-width", 4);
    $((this.rep)).attr("stroke", "black");
    this.out.monCompos = this;
    this.activation = function() {
        return this.val;
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
    this.init = function() {
        return 0;
    }

    this.update = function() {
        let x = this.x();
        let y = this.y();
        this.out.set(x + 70, y + 30);
    }
    // mettre la bouton dans le tableau du composants
    composants.push(this);
}

function addevt(bout) {

    $((bout.rep)).on("mousedown", function(e) {
        let svg = document.getElementById("svgPrincipale");
        $(svg).append(bout.rep);
        $(svg).append($(bout.out.rep));
        selected = bout.id;
        e.preventDefault();
        if (bout.wait) {
            bout.val = (bout.val + 1) % 2;
            if (bout.val) {
                $((bout.rep)).attr("fill", "red");
            } else {
                $((bout.rep)).attr("fill", "white");
            }
            bout.wait = false;
        }
    });
    $((bout.rep)).on("mouseup", function() {
        selected = "";
        bout.wait = true;
    });
}