import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { FacturaService } from "../services/factura.service";
import Swal from 'sweetalert2'

@Component({
    selector: 'facturas',
    templateUrl: './facturas.component.html'
    //styleUrls: ['./app.component.css']
})
export class FacturasComponent implements OnInit{

    objFacturas: any[] = [];
    constructor(public service:FacturaService) {
        let nit:number;
        let id:number;
        let nombreFactura:string;
        let fecha:string;

     }

    //public facturas:Array<Factura>=[];
    ngOnInit(): void {
        this.getFacturas(); 
    }

    getFacturas(){
        this.service.getFacturas().subscribe(data => {
            let objDetalles;
            for (let i = 0; i < data.length; i++) {
                objDetalles = data[i].detalles;
                if(objDetalles.length > 0){
                    let cantidad = 0, montoTotal = 0;
                    for (let j = 0; j < objDetalles.length; j++) {
                        cantidad += objDetalles[j].cantidad;
                        montoTotal += (objDetalles[j].cantidad * objDetalles[j].precio);
                    }
                    data[i].total = montoTotal;
                }else{
                    data[i].total = 0;
                }
            }
            //data.cantidad = cantidad;
            this.objFacturas = data;
        }, error => {
            console.log(error);
        })
    }

    deleteFactura(idfactura: number){
        Swal.fire({
            title: '',
            text: '¿Esta seguro de eliminar el registro?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
                this.service.deleteFactura(idfactura).subscribe(data => {
                    this.getFacturas();
                    Swal.fire(
                      'Eliminado!',
                      'Se ha eliminado el registro.',
                      'success'
                    )
                })            
            }
          })
    }
}