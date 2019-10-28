import { Walker } from "./walker";
import { Ip } from "./ip";

export class Grid {

    constructor(

        public id_grid: number,
        public total_pies: number,
        public total_casas: number,
        public total_negocios: number,
        public total_escuelas: number,
        public total_iglesias: number,
        public total_baldios: number,
        public numero_plano: string,
        public comentarios: string,
        public archivo: string,
        public estatus: boolean,
        public ip?: Ip,
        public walkers?: Array<Walker>,
        
    ){}

}


