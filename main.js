//composantID est utilisé pour généré des nouvelles id pour les composants
let composantID = 0;
let nameSpace = 'http://www.w3.org/2000/svg';

//On utilise ce tabaleau pour la mise à jour des valeurs et des positions
let composants = [];

// modal est la boîte rouge qui nous permet de voir la liste des composants(and,or,....)
let modal = add(40, 40, "red", "black", "boutont", false);

//Ajouter la positibilité du click
$(modal).on("mousedown", function() {
    $("#modal-principal").modal("show");
    moveing = false;
    selected = "boutont";
});

//terminer le glisser-déposer sur la boîte rouge
$(modal).on("mouseup", function() {
    selected = "";
});

//changer la position de la boite rouge
$(modal).attr("y", "600");
$(modal).attr("x", "600");



//pour avoir un nouveau id
function getNextId() {
    // accée au variable global composantId la ajouter 1 le mot piece pour faire la diffirence avec epingles
    return ((composantID++).toString() + "piece")
}

//cette fonction éxécute quand on click sur "ajouter" et créer des objets (not, or and)
function ajouter() {

    for (let i = 0; i < parseFloat($("#times0").val()); i++) {
        eval("new not "+ "(getNextId())");
    }
    for (let i = 0; i < parseFloat($("#times1").val()); i++) {
        eval("new or "+ "(getNextId())")
    }

    for (let i = 0; i < parseFloat($("#times2").val()); i++) {
        eval("new and" + "(getNextId())");
    }

    for (let i = 0; i < parseFloat($("#times3").val()); i++) {
        eval("new lampe"+ "(getNextId())");
    }

    for (let i = 0; i < parseFloat($("#times4").val()); i++) {
        eval("new bouton "+ "(getNextId())");
    }
}

let selected = "";

//première position x et y des clicks
let prx = 0;
let pry = 0;

//premiére position des éléments
let fx = 0;
let fy = 0;


$("body").on("mousemove touchmove", function(e) {

   let nom = "#" + selected;
   let x = e.pageX;
   let y = e.pageY;

   //Mise à jour des positions
   positionner(nom, x, y);
});
$("body").on("mouseup", function(e) {
    selected = "";
});

$("body").on("mousedown", function(e) {
    if (selected != "") {
        prx = e.pageX
        pry = e.pageY 
        nom = "#" + selected;

        if ($(nom).attr("class") == "lampe") {
            fx = parseFloat($(nom).attr("cx"));
            fy = parseFloat($(nom).attr("cy"));
        } else {
            fx = parseFloat($(nom).attr("x"));
            fy = parseFloat($(nom).attr("y"));
        }
    }
});

//changer les emplacements des objets
function positionner(nom, x, y) {
    let obj, objx, objy;
    obj = "#" + selected;

    x = parseFloat(x);
    y = parseFloat(y);


    if ($(nom).attr("class") != "lampe") {
        obj = "#" + selected;
        objx = parseFloat($(obj).attr("x"));
        objy = parseFloat($(obj).attr("y"));

        x = parseFloat(x);
        y = parseFloat(y);

        xdif = fx - prx;
        ydif = fy - pry;

        x += xdif;
        y += ydif;

    
        //paramétrer des nouvelles positions
        $(obj).attr("x", (x).toString());
        $(obj).attr("y", (y).toString());
    } else {
      
        obj = "#" + selected;
        objx = parseFloat($(obj).attr("cx"));
        objy = parseFloat($(obj).attr("cy"));

        x = parseFloat(x);
        y = parseFloat(y);

        xdif = fx - prx;
        ydif = fy - pry;

        x += xdif;
        y += ydif;
        //paramétrer les nouvelles positions
        $(obj).attr("cx", (x).toString());
        $(obj).attr("cy", (y).toString());
    }
};
// dessign des formes
function add(h, w, color, stroke, id, on) {
    let g = document.createElementNS(nameSpace, 'g');
    $(g).attr({
        width: "100%",
        height: "100%"
    });
    let el = $(document.createElementNS(nameSpace, 'rect')).attr({
        x: "60",
        y: "60",
        id: id,
        fill: color,
        height: h.toString() + "px",
        width: w.toString() + "px",
        stroke: stroke,
        rx: "20",
        ry: "20"
    });
    if (on) {
        $(el).attr("onmousedown", "selected='" + id + "';");
        $(el).attr("onmouseup", "selected='';");
    }
    $(el).attr("stroke-width", "4");
    $(g).append(el);
    let elem = document.getElementById("svgPrincipale");
    elem.appendChild(g);
    return el;
}


// pour mettre a jour notre page chaque 1 miliseconde
setInterval(function() {
    for (let i = 0; i < composants.length; i++) {
        composants[i].update();
    }
    for (let i = 0; i < lines.length; i++) {
        lines[i].update();
    }
    for (let i = 0; i < epingles.length; i++) {
        epingles[i].update();
    }
}, 1);