import { DefaultSettings } from "./DefaultSettings.js";
import { ImageOp } from "./ImageOp.js";

export class ImageLocal implements ImageOp {
  //atributos
  protected img: HTMLImageElement;
  protected screen: CanvasRenderingContext2D;
  protected readyToDraw: boolean;
  protected isScaled: boolean;
  // protected document: HTMLDocument;

  public constructor(p: CanvasRenderingContext2D, ready?: boolean){
    this.img = new Image();
    this.screen = p;
    // this.document = d;
    
    this.readyToDraw = ready;
    this.isScaled = false;
    
    this.handleFileSelect = this.handleFileSelect.bind(this);  
    this.onload = this.onload.bind(this);  
  }
    
  public handleFileSelect(evt:any):void {
    let files: any;
    
    if(evt.type === "drop") {
      evt.stopPropagation();
      evt.preventDefault();
      files = evt.dataTransfer.files;
    }
    if(evt.type === "change")
      files = evt.target.files; // FileList object
            
    // files is a FileList of File objects. List some properties.
    let output:any[] = [];
    //console.log(evt)
    let f:any = files[0];
    output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
    f.size, ' bytes, last modified: ',
    f.lastModifiedDate.toLocaleDateString(), '</li>');
                
    this.img.src = f.name;      
    this.readyToDraw = true;  

    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';     
    this.onload();
  }

  public getImage():HTMLImageElement{
        return this.img;
  }
  public getScreen():CanvasRenderingContext2D{
    return this.screen;
  }

  public setScaled(v:boolean):void{
        this.isScaled = v;
  }
  public onload() {
    this.getScreen().clearRect(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT);
    /** SI nuestro canvas es mas pequeño que la imagen se dibuja a su escala normal, 
     * si es mas grande se dibuja reescalado al ancho de ventana por default  */
    if (this.getImage().width > DefaultSettings.SIZE_WIDTH
      || this.getImage().height > DefaultSettings.SIZE_HEIGHT) {
      this.getScreen().drawImage(this.getImage(), 0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT);
      this.setScaled(true);
    }
    else {
      this.getScreen().drawImage(this.getImage(), 0, 0, this.getImage().width, this.getImage().height);
      this.setScaled(false);
    }
  }
}