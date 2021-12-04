import { DefaultSettings } from "./DefaultSettings.js";
var ImageLocal = /** @class */ (function () {
    // protected document: HTMLDocument;
    function ImageLocal(p, ready) {
        this.img = new Image();
        this.screen = p;
        // this.document = d;
        this.readyToDraw = ready;
        this.isScaled = false;
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.onload = this.onload.bind(this);
    }
    ImageLocal.prototype.handleFileSelect = function (evt) {
        var files;
        if (evt.type === "drop") {
            evt.stopPropagation();
            evt.preventDefault();
            files = evt.dataTransfer.files;
        }
        if (evt.type === "change")
            files = evt.target.files; // FileList object
        // files is a FileList of File objects. List some properties.
        var output = [];
        //console.log(evt)
        var f = files[0];
        output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate.toLocaleDateString(), '</li>');
        this.img.src = f.name;
        this.readyToDraw = true;
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        this.onload();
    };
    ImageLocal.prototype.getImage = function () {
        return this.img;
    };
    ImageLocal.prototype.getScreen = function () {
        return this.screen;
    };
    ImageLocal.prototype.setScaled = function (v) {
        this.isScaled = v;
    };
    ImageLocal.prototype.onload = function () {
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
    };
    return ImageLocal;
}());
export { ImageLocal };
