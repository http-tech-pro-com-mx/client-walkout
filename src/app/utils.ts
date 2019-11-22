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


export{
    noWhitespaceValidator,
    clone
}