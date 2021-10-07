import * as internal from "stream";

export class Factura{
    constructor(
        public id: number,
        public nit: string,
        public nombreFactura: string,
        public fecha: string,
        public estado: internal,
        public detalles: string
    ){}
}