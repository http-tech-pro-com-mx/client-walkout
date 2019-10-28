
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchIPPipe } from './search-ip.pipe'
@NgModule({
  declarations: [SearchIPPipe],
  imports: [
    CommonModule
  ],
  exports:[
    SearchIPPipe
  ]
})
export class PipeModule { }