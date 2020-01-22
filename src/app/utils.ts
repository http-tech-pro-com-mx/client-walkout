import { FormControl } from "@angular/forms";

function noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}


/**
* @function clone
* @param  {JSON} json -  atributos
* @return  {string} 
* @description permite clonar objeto
*/
function clone(json) {
    return JSON.parse(JSON.stringify(json));
}


/**
 * @function getTablaUtf8
 * @param  {number} id -  Selector jquery de la tabla
 * @return  {string} 
 * @description funcion utilizada para quitar caracteres especiales cuando se exporta a excel
 */
function getTablaUtf8(id: string): string {
    let tabla = document.getElementById(id);
    return tabla.outerHTML.replace(/ /g, '%20')
        .replace(/á/g, '%e1')
        .replace(/Á/g, '%c1')
        .replace(/é/g, '%e9')
        .replace(/É/g, '%c9')
        .replace(/í/g, '%a1')
        .replace(/Í/g, '%ed')
        .replace(/ó/g, '%f3')
        .replace(/Ó/g, '%d3')
        .replace(/ú/g, '%fa')
        .replace(/Ú/g, '%da')
        .replace(/Ñ/g, '%d1')
        .replace(/ñ/g, '%f1')
        .replace(/´/g, '%27')
        .replace(/-/g, '%2d')
        .replace(/=/g, '%3d')
        .replace(/,/g, '%2c')
        .replace(/\//g, '%2f')
        .replace(/#/g, '%23');
}


export {
    noWhitespaceValidator,
    clone,
    getTablaUtf8
}