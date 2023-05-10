const lblNome = document.getElementById("label");
const lblPrecisao = document.getElementById("confidence");

const corDeFundo = "#fff";

var canvas, classifier;

function preload() {
    classifier = ml5.imageClassifier('DoodleNet', modelReady);
}

function setup() {
    canvas = createCanvas(500, 500);
    background(corDeFundo);
    canvas.mouseReleased(classifyCanvas);
}

function draw() {
    strokeWeight(6);
    stroke(0);
    if(mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function limparTela() {
    background(corDeFundo);
    lblNone.textContent = "";
    lblPrecisao.textContent = "";
}

function modelReady() {
    console.log("Modelo carregado 🗿🍷")
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results[0]);
        const label = results[0].label;
        const conf = round(results[0].confidence * 100);
        console.log(conf);

        lblNome.textContent = label.replace("_", " ");
        lblPrecisao.textContent = conf + "%";
    }
}