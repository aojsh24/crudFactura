import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FacturaService } from "../services/factura.service";

@Component({
    selector: 'factura',
    templateUrl: './factura.component.html'
})
export class FacturaComponent{
    public titulo = "Factura";
    public idfactura:any;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        public service:FacturaService
    ){}
    

    objDetalles: any[] = [];
    id: number = 0;
    nit: string = "";
    nombreFactura: string = ""; 
    fecha: string = "";
    total: number = 0;
    ngOnInit(){
        this.getFactura();
    }

    getFactura(){
        this._route.params.forEach((params:Params) => {
            let id = params['id'];
            
                this.service.getFactura(id).subscribe(data => {
                    this.objDetalles = data.detalles;
                    this.id = data.id;
                    this.nit = data.nit;
                    this.nombreFactura = data.nombreFactura;
                    this.fecha = data.fecha;
                    let cantidad = 0, montoTotal = 0;
                    let objDetalles;
                    //console.log(data);
                        objDetalles = data.detalles;
                        if(objDetalles.length > 0){
                            for (let j = 0; j < objDetalles.length; j++) {
                                cantidad += objDetalles[j].cantidad;
                                montoTotal += (objDetalles[j].cantidad * objDetalles[j].precio);
                            }
                            this.total = montoTotal;
                        }
                    console.log(this.objDetalles);
                }, error => {
                    console.log(error);
                })
        });
    }

    onPrint() {
       window.print();
    }

}