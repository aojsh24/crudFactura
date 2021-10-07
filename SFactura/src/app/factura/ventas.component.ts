import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { FacturaService } from "../services/factura.service";
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
@Component({
    selector: 'ventas',
    templateUrl: './ventas.component.html'
    //styleUrls: ['./app.component.css']
})
export class VentasComponent{
    public title = "Ventas";
    public numero:number;
    public nit:string;
    public nombreFactura:string;
    public fecha:string;
    public montoTotal:number = 0;
    public venta:any = {};
    public json:any = {};
    public detalle:any = {
        nombreProducto:"",
        cantidad:0,
        precio:0,
        totalLinea:0
    };

    public detalles:Array<any> = [];
    constructor(public service:FacturaService,private location: Location){
    }
    
    ngOnInit(): void{
    }

    addDetalle(){
        if(this.detalle.nombreProducto == ""){
            Swal.fire(
                '',
                'Ingrese nombre de producto.',
                'error'
            )
        }else if(this.detalle.cantidad === 0 || this.detalle.cantidad == "" ){
            Swal.fire(
                '',
                'Ingrese cantidad del producto.',
                'error'
            )
        }else if(this.detalle.precio === 0 || this.detalle.precio == "" ){
            Swal.fire(
                '',
                'Ingrese precio del producto.',
                'error'
            )
        }else{
            this.detalle.totalLinea = this.detalle.cantidad * this.detalle.precio;
            this.montoTotal += this.detalle.totalLinea; 
            let detalle =  JSON.parse(JSON.stringify(this.detalle));
            this.detalles.push(detalle);
            this.detalle.nombreProducto = "";
            this.detalle.cantidad=0;
            this.detalle.precio=0;
            this.detalle.totalLinea=0;
        }
    }
    
    delDetalle(index:number){
        this.montoTotal = 0;
        this.detalles = this.detalles.filter((e,i)=>i!=index);
        if(this.detalles.length > 0 ){
            for (let i = 0; i < this.detalles.length; i++) {
                this.montoTotal += this.detalles[i].cantidad * this.detalles[i].precio;              
            }
        }
    }
    
    onSubmit(){
        this.venta.estado=1;
        this.venta.detalles = this.detalles;

        if(!this.venta.nit){
            Swal.fire(
                '',
                'Ingrese número de NIT.',
                'error'
            )
        }else if(!this.venta.nombreFactura){
            Swal.fire(
                '',
                'Ingrese Nombre.',
                'error'
            )
        }else if(!this.venta.fecha){
            Swal.fire(
                '',
                'Seleccione la Fecha.',
                'error'
            )
        }else if(!this.venta.detalles.length){
            Swal.fire(
                '',
                'Agregue productos en la venta.',
                'error'
            )
        }else{
            this.service.setFactura(this.venta).subscribe(data => {

                this.venta.nit = "";
                this.venta.nombreFactura="";
                this.venta.fecha="";
                this.venta.detalles=0;
                location.reload();
                Swal.fire(
                    'Facturación!',
                    'Venta facturada correctamente.',
                    'success'
                  )
            })
        }
        return false;
    }
}
