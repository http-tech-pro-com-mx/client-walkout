export class Ip {

    constructor(
        public id_ip: number,
        public ip: string,
        public km: number,
        public sp: boolean,
        public ubicacion: string,
        public fecha_registro: Date,
        public usuario_registro: number,
        public qc: boolean,
        public estatus: boolean,
        public fecha_update?: Date,
        public usuario_update?: number
    ){}
}
