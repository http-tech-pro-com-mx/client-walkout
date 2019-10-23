import { Walker } from "./walker";

export class Grid {

    constructor(

        public id_grid: number,
        public fecha: Date,
        public total_pies: number,
        public total_casas: number,
        public total_negocios: number,
        public total_escuelas: number,
        public total_iglesias: number,
        public total_baldios: number,
        public numero_plano: string,
        public comentarios: string,
        public tipo: number,
        public archivo: string,
        public estatus: boolean,
        public walkers?: Array<Walker>
        
    ){}

}


