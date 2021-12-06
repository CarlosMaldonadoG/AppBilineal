
import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
import { DefaultSettings } from "./DefaultSettings.js";

let lienzo1: HTMLCanvasElement;
let lienzo2: HTMLCanvasElement;
let pantalla1: CanvasRenderingContext2D;
let pantalla2: CanvasRenderingContext2D;


let arr_Img = new Array();//arreglo donde guardo los estados de la imagen para poder aplicar la funcion de borrar puntos
let posImgCv = -1;//una variable tipo "contador" para saber en que posion ando, lo ocupo para restablecer la img cuando borro puntos
let arrayX : number []=[];//arreglo donde almaceno las posiciones de X
let arrayY : number []=[];//arreglo donde almaceno las posiciones de Y

/* Este evento controla la forma de abrir un archivo mediante el evento de arrastrar y soltar */
function handleDragOver(evt:any) {
    evt.stopPropagation();
    evt.preventDefault(); //que no se abra en otra ventana sola la imagen
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

  /** Variables que controla el canvas de la imagen, el primero 
   * posteriormemte se volveran arreglos cuando ya controlemos las seis ventanas de nuestro frame
  */
lienzo1 = <HTMLCanvasElement>document.getElementById('img1');
pantalla1 = lienzo1.getContext("2d");
lienzo2 = <HTMLCanvasElement>document.getElementById('img2');
pantalla2 = lienzo2.getContext("2d");
//lienzo4 = <HTMLCanvasElement>document.getElementById('img4');
//pantalla4 = lienzo4.getContext("2d");

var dropZone = lienzo1;//document.getElementById('img1');
var imgLocal: ImageLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
//var imgLocal4: ImageLocal = new ImageLocal(pantalla4);
//imgLocal4.getImage().onload = imgLocal4.onload;


function dibujarPuntos(){
  lienzo1.addEventListener("mousedown", puntosRec);
}

function puntosRec(evt: any): void{
  let posicionX:number = evt.offsetX;
  let posicionY: number = evt.offsetY;
  
  arr_Img.push(pantalla1.getImageData(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT));
  posImgCv ++;
  let groSor = 6;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  pantalla1.fillRect(posicionX,posicionY,groSor,groSor);
  arr_Img.push(pantalla1.getImageData(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT));
  posImgCv ++;
  arrayX.push(posicionX);
  arrayY.push(posicionY);
}
function borrarCanvas(){
  posImgCv --;
  arr_Img.pop();
  pantalla1.putImageData(arr_Img[posImgCv], 0, 0);
}

document.getElementById('files').addEventListener('change', imgLocal.handleFileSelect, false);
//document.getElementById('files2').addEventListener('change', imgLocal4.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);


function bilinealImg(evt: any): void{
   if(!arrayX.length || !arrayY.length || posImgCv < 3 ){//comprobamos si el arreglo de puntos esta vacio
    alert("Seleccionar los puntos X y Y de la región a ampliar");
    
   }else{
    pantalla1.putImageData(arr_Img[0], 0, 0);/*vuelvo a dibujar la imagen en el canvas porque 
    como estoy dibujando puntos negros a la hora de la transfomacion esos puntos se quedan en la imagen de salida*/
    var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.bilineal(imagenSal, arrayX, arrayY));

  }
 }

 function restableceImg(){
  if(!arrayX.length || !arrayY.length || posImgCv < 3 ){//comprobamos si el arreglo de puntos esta vacio
    alert("No se han dibujado puntos en la imagen");
   }else{
    pantalla1.putImageData(arr_Img[0], 0, 0);
   }
}

function limpiarCanvas(){
  pantalla1.clearRect(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT);
  pantalla2.clearRect(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT);
}

document.getElementById("op-dibPtn").addEventListener('click', dibujarPuntos, false);
document.getElementById("op-borrarcnv").addEventListener('click', borrarCanvas, false);
document.getElementById("op-bilineal").addEventListener('click', bilinealImg, false);
document.getElementById("op-limpiarcanvas").addEventListener('click', limpiarCanvas, false);
document.getElementById("op-restabImg").addEventListener('click', restableceImg, false);