import { Pipe, PipeTransform } from '@angular/core';
import { Ip } from '../models/ip';

@Pipe({
  name: 'searchIP'
})
export class SearchIPPipe implements PipeTransform {

  transform(ips: Array<Ip>, searchText: string): Array<Ip> {
    if (!ips) return [];
    if (!searchText) return ips;

    searchText = searchText.toUpperCase();
    
    return ips.filter(ip => {
      return ip.ip.includes(searchText) || ip.ubicacion.includes(searchText) || ip.index.toString().includes(searchText);
    });

  }

}
