import { Proyecto } from "./proyecto";
import { Grid } from "./grid";

export class Ip {

    constructor(
        public id_ip: number,
        public ip: string,
        public pies: number,
        public ubicacion: string,
        public fecha_levantamiento: Date,
        public fecha_registro: Date,
        public usuario_registro: number,
        public QC: number,
        public estatus: boolean,
        public tipo: number,
        public proyecto: Proyecto = new Proyecto(-1,'','',true),
        public grids: Array<Grid> = [] ,
        public fecha_update?: Date,
        public usuario_update?: number
    ){
    }


    getKilometros(){
        
    }
}
