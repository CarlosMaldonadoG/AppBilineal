import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
import { DefaultSettings } from "./DefaultSettings.js";
var lienzo1;
var lienzo2;
var lienzo4;
var pantalla1;
var pantalla2;
var pantalla4;
var arr_Img = new Array(); //creo arreglo unidimensional para guardar las posiciones X
var posImgCv = -1;
//let arr_numY = new Array();//creo arreglo unidimensional para guardar las posiciones Y
//let numero1 : number=arr_numX.forEach(elemento,0);
//let arr_numXY =[[arr_numX],[arr_numY]];//creo arreglo bidimensional para guardar las posiciones X y Y
var arrayX = [];
var arrayY = [];
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
lienzo4 = document.getElementById('img4');
pantalla4 = lienzo4.getContext("2d");
var dropZone = lienzo1; //document.getElementById('img1');
var imgLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
var imgLocal4 = new ImageLocal(pantalla4);
imgLocal4.getImage().onload = imgLocal4.onload;
function puntosRec(evt) {
    var posicionX = evt.offsetX;
    var posicionY = evt.offsetY;
    var groSor = 6;
    //pantalla1.clearRect(0, 0, 463, 279); para limpiar el canvas al terminar de guardar
    //pantalla1.clearRect(0, 0, groSor, groSor);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    pantalla1.fillRect(posicionX, posicionY, groSor, groSor);
    console.log(posicionX);
    console.log(posicionY);
    //arr_numX.push(posicionX);
    //arr_numY.push(posicionY);
    arr_Img.push(pantalla1.getImageData(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT));
    posImgCv++;
    console.log(arr_Img);
    console.log(posImgCv);
    arrayX.push(posicionX);
    arrayY.push(posicionY);
}
lienzo1.addEventListener("mousedown", puntosRec);
document.getElementById('files').addEventListener('change', imgLocal.handleFileSelect, false);
document.getElementById('files2').addEventListener('change', imgLocal4.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);
function bilinealImg(evt) {
    //let data =[[arr_numX],[arr_numY]];
    /*let data: number[][]= [[55,394,460,1],
                          [2,2,275,275]];*/
    if (!arrayX.length || !arrayY.length || posImgCv < 3) { //comprobamos si el arreglo de puntos esta vacio
        alert("Seleccionar los puntos X y Y de la región a ampliar");
        pantalla1.font = '12px Cambria Math';
        pantalla1.fillText('x1, y1', 10, 10);
        pantalla1.fillText('X2, Y2', 423, 10);
        pantalla1.font = '12px Arial';
        pantalla1.fillText('X3, Y3', 423, 269);
        pantalla1.fillText('X4, Y4', 10, 269);
    }
    else {
        var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
        imagenSal.imageArray2DtoData(pantalla2, MathImg.bilineal(imagenSal, arrayX, arrayY));
    }
}
function borrarCanvas(evt) {
    //pantalla2.clearRect(0, 0, 463, 279);
    posImgCv--;
    arr_Img.pop();
    console.log(arr_Img);
    console.log(posImgCv);
    pantalla1.putImageData(arr_Img[posImgCv], 0, 0);
}
//geometrica
document.getElementById("op-borrarcnv").addEventListener('click', borrarCanvas, false);
document.getElementById("op-bilineal").addEventListener('click', bilinealImg, false);
