
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchIPPipe } from './search-ip.pipe';
import { FtKmPipe } from './ft-km.pipe'
@NgModule({
  declarations: [SearchIPPipe, FtKmPipe],
  imports: [
    CommonModule
  ],
  exports:[
    SearchIPPipe,
    FtKmPipe
  ]
})
export class PipeModule { }