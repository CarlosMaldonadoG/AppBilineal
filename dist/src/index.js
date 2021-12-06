import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
import { DefaultSettings } from "./DefaultSettings.js";
var lienzo1;
var lienzo2;
var pantalla1;
var pantalla2;
var arr_Img = new Array(); //contador donde guardo los estados de la imagen para poder aplicar la funcion de borrar puntos
var posImgCv = -1; //una variable tipo "contador" para saber en que posion ando, lo ocupo para restablecer la img cuando borro puntos
var arrayX = []; //variable donde almaceno las posiciones de X
var arrayY = []; //variable donde almaceno las posiciones de Y
/* Este evento controla la forma de abrir un archivo mediante el evento de arrastrar y soltar */
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault(); //que no se abra en otra ventana sola la imagen
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
/** Variables que controla el canvas de la imagen, el primero
 * posteriormemte se volveran arreglos cuando ya controlemos las seis ventanas de nuestro frame
*/
lienzo1 = document.getElementById('img1');
pantalla1 = lienzo1.getContext("2d");
lienzo2 = document.getElementById('img2');
pantalla2 = lienzo2.getContext("2d");
//lienzo4 = <HTMLCanvasElement>document.getElementById('img4');
//pantalla4 = lienzo4.getContext("2d");
var dropZone = lienzo1; //document.getElementById('img1');
var imgLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
//var imgLocal4: ImageLocal = new ImageLocal(pantalla4);
//imgLocal4.getImage().onload = imgLocal4.onload;
function puntosRec(evt) {
    var posicionX = evt.offsetX;
    var posicionY = evt.offsetY;
    arr_Img.push(pantalla1.getImageData(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT));
    posImgCv++;
    var groSor = 6;
    pantalla1.fillRect(posicionX, posicionY, groSor, groSor);
    arr_Img.push(pantalla1.getImageData(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT));
    posImgCv++;
    arrayX.push(posicionX);
    arrayY.push(posicionY);
}
function dibujarPuntos() {
    lienzo1.addEventListener("mousedown", puntosRec);
}
document.getElementById('files').addEventListener('change', imgLocal.handleFileSelect, false);
//document.getElementById('files2').addEventListener('change', imgLocal4.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);
function bilinealImg(evt) {
    if (!arrayX.length || !arrayY.length || posImgCv < 3) { //comprobamos si el arreglo de puntos esta vacio
        alert("Seleccionar los puntos X y Y de la región a ampliar");
    }
    else {
        var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
        imagenSal.imageArray2DtoData(pantalla2, MathImg.bilineal(imagenSal, arrayX, arrayY));
    }
}
function borrarCanvas() {
    posImgCv--;
    arr_Img.pop();
    pantalla1.putImageData(arr_Img[posImgCv], 0, 0);
}
function limpiarCanvas() {
    pantalla1.clearRect(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT);
}
//geometrica
document.getElementById("op-borrarcnv").addEventListener('click', borrarCanvas, false);
document.getElementById("op-bilineal").addEventListener('click', bilinealImg, false);
document.getElementById("op-limpiarcanvas").addEventListener('click', limpiarCanvas, false);
document.getElementById("op-dibPtn").addEventListener('click', dibujarPuntos, false);
