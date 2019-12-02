import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ftKm'
})

export class FtKmPipe implements PipeTransform {

  
 private  KM: number = 0.0003048;

  transform( pies: number, args?: any): any {
    let km = parseFloat( ( pies * this.KM ).toFixed(2));
    return km;
  }

}
