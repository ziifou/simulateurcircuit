let count = 0;
let epingles = [];
let epen1 = "";
let epen2 = "";
let num;

function epingle(type) {
    this.state = true;
    this.monCompos = "";
    this.val = false;
    if (type == 0) {
        this.type = true;
    } else {
        this.type = false;
    }

    this.id = count.toString();
    count++;
    this.name = "#" + this.id;
    // rep pour representation graphique
    this.rep = add(20, 20, "white", "black", this.id, false);
    clicked(this);
    this.name = "#" + this.id;
    this.set = function(x, y) {
        $(this.name).attr("x", x.toString());
        $(this.name).attr("y", y.toString());
    }
    epingles.push(this);
    this.num = epingles.length - 1;

    //tester et  mettre a jour la couleur du épingle jaune ==> on , blanc ==> off
    this.update = function() {
        if (this.monCompos != "") {
            if (!(this.type)) {
                this.val = this.monCompos.activation();
            } else {
                this.val = this.monCompos.val;
            }
        }
        if (this.val) {
            $((this.rep)).attr("fill", "yellow");
        } else {
            $((this.rep)).attr("fill", "white");
        }
    }

}
//  créer un arc entre 2 épengles  
function clicked(epengle) {
    $(epengle.rep).on("click ", function(e) {
        e.preventDefault();
        if (epengle.type == true) {
            epen1 = epengle;
        } else {
            epen2 = epengle;
        }
        if ((epen1 != "") && (epen2 != "")) {
            if ((epen1.state)) {
                epen1.monCompos = epen2;
                epen1.state = false;
                epen2.state = false;
                a = new arc(epen1, epen2);
                epen1 = "";
                epen2 = "";
            }
        }
    });
}