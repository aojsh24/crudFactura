import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FacturaService } from "../services/factura.service";
import Swal from 'sweetalert2'
@Component({
    selector: 'editar',
    templateUrl: './editar.component.html'
    //styleUrls: ['./app.component.css']
})
export class EditarComponent{
    public title = "Editar Ventas";
    public numero:number;
    public nit:string;
    public nombreFactura:string;
    public fecha:string;
    public montoTotal:number = 0;
    public venta:any = {};
    objDetalles: any[] = [];
    id: number = 0;
    total: number = 0;
    public detalle:any = {
        nombreProducto:"",
        cantidad:0,
        precio:0,
        totalLinea:0
    };

    public detalles:Array<any> = [];
    
    constructor(public service:FacturaService,
        private _route: ActivatedRoute,
        private _router: Router
    ){}
    
    ngOnInit(): void{
        this.getFactura();
    }

    getFactura(){
        this._route.params.forEach((params:Params) => {
            let id = params['id'];
            this.service.getFactura(id).subscribe(data => {
                this.venta = data;
                this.objDetalles = data.detalles;
                this.id = data.id;
                this.nit = data.nit;
                this.nombreFactura = data.nombreFactura;
                this.fecha = data.fecha;
                let cantidad = 0, montoTotal = 0;
                let objDetalles;
                objDetalles = data.detalles;
                if(objDetalles.length > 0){
                    for (let j = 0; j < objDetalles.length; j++) {
                        cantidad += objDetalles[j].cantidad;
                        montoTotal += (objDetalles[j].cantidad * objDetalles[j].precio);
                    }
                    this.total = montoTotal;
                }
            }, error => {
                console.log(error);
            })
        });
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
            detalle.idFactura = this.id;
            //hacer post para los nuevos productos
            detalle.id = 0;
            this.detalle.nombreProducto = "";
            this.detalle.cantidad=0;
            this.detalle.precio=0;
            this.detalle.totalLinea=0;
            this.service.setDetalle(detalle).subscribe(data => {
                this.getFactura();
            })
        }
    }
    
    delDetalle(index:number){
        console.log(this.objDetalles.length);

        if(this.objDetalles.length === 1 ){
            Swal.fire(
                '',
                'La venta debe tener como mínimo un producto.',
                'error'
            )
        }else{
            let detalle = this.objDetalles[index];
            Swal.fire({
                title: '',
                text: '¿Esta seguro de eliminar el registro?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.service.deleteDetalle(detalle.id).subscribe(data => {
                        this.getFactura();
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
    
    onSubmit(){
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
            this.service.update(this.id,this.venta).subscribe(data => {
                Swal.fire(
                    'Facturación!',
                    'Factura actualizada correctamente.',
                    'success'
                  )
            })
        }
        return false;
    }
    
}
