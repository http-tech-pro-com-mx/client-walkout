import { Proyecto } from "./proyecto";
import { Grid } from "./grid";

export class Ip {

    constructor(
        public id_ip: number,
        public ip: string,
        public pies: number,
        public ubicacion: string,
        public fecha_registro: Date,
        public usuario_registro: number,
        public qc: number,
        public estatus: boolean,
        public tipo: number,
        public proyecto: Proyecto,
        public grids: Array<Grid> = [] ,
        public fecha_asignacion: Date,
        public fecha_envio_campo?: Date,
        public fecha_qc?: Date,
        public fecha_levantamiento?: Date,
        public fecha_cliente?: Date,
        public fecha_shared_point?: Date,
        public total_grids?: number,
        public actualizacion?: boolean,
        public km_actualizados?: number,
        public fecha_update?: Date,
        public usuario_update?: number,
        public participantes?: Array<string>,
        public index?: number,
        public fecha_asignacion_caminar?: Date
        //participantes solo es una variable auxiliar para obtener participantes, no forma parte del esquema de bd
    ){
        this.proyecto = new Proyecto(-1,'','',true);
        this.actualizacion = false;
    }


}
