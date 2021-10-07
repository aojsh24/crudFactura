import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app/app.component";
//Import componentes
import { HomeComponent } from "./app/factura/home.component";
import { FacturaComponent } from "./app/factura/factura.component";
import { FacturasComponent } from "./app/factura/facturas.component";
import { VentasComponent } from "./app/factura/ventas.component";
import { EditarComponent } from "./app/factura/editar.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'ventas', component: VentasComponent},
    {path: 'facturas', component: FacturasComponent},
    {path: 'factura/:id', component: FacturaComponent},
    {path: 'editar/:id', component: EditarComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

