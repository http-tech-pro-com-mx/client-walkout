import { Ip } from "./ip";

export class Proyecto {

    constructor(
        public id_proyecto: number,
        public nombre: string,
        public descripcion: string,
        public estatus:  boolean,
        public ips?: Array<Ip>
    ){}

}
