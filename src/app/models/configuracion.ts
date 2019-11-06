import { Proyecto } from "./proyecto";

export class Configuracion{

    constructor(
        public id_configuracion: number,
        public nombre: string,
        public fecha_inicio: Date,
        public fecha_fin: Date,
        public meta: number,
        public estatus: boolean,
        public descripcion?: string,
        public proyecto?: Proyecto
    ){}

}